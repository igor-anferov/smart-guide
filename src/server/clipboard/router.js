const assert = require('assert').strict;
const express = require('express');

const { image_checker, latex_checker } = require('../base_elements/utils')

let router = express.Router();

const pool = require('../db/pool')

router.get('/base_elements', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT base_element_id, title, source, type, is_pivotal FROM BaseElements WHERE author_id = $1 and clipboard = $2 ORDER BY created;',
      [req.user.id, true]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.delete('/base_elements/:base_element_id', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    await pool.query(
      'DELETE FROM BaseElements WHERE base_element_id = $1;',
      [base_element_id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.post('/base_elements', image_checker, latex_checker, async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const {image, latex, source, title, is_pivotal, tags} = req.body;
      assert(Boolean(image) !== Boolean(latex))
      const [type, body] = image ? ['image', image.buffer] : ['latex', Buffer.from(latex)];
      const results = await client.query(
        'INSERT INTO BaseElements (title, author_id, body, source, type, is_pivotal, clipboard, created) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING base_element_id',
        [title, req.user.id, body, source, type, is_pivotal, true]
      )
      for (var tag in tags) {
        if (tags.hasOwnProperty(tag)) {
          await client.query('INSERT INTO BaseElementTags (tag, base_element_id) VALUES ($1, $2)',
            [tags[tag], results.rows[0].base_element_id]
          )
        }
      }
      await client.query('COMMIT')
      res.status(201).json({
        "base_element_id": results.rows[0].base_element_id
      })
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release();
  }
})

router.post('/base_elements/search', async (req, res, next) => {
  var query = req.body.query
  query = query.replace(/ /g, '|');
  try {
    const results_title = await pool.query(
      "SELECT json_build_object('base_element_id', base_element_id, 'title', \
      ts_headline('russian', title, q), 'source', source, 'type', type) as base_element\
      FROM BaseElements, to_tsquery('russian', $3) as q\
      WHERE author_id = $1 AND clipboard = $2 AND to_tsvector('russian', title) @@ q", 
      [req.user.id, true, query]
    )
    const results_tags = await pool.query( 
      "SELECT json_build_object('base_element_id', base_element_id, 'title', title, 'source', source, 'type', type) as base_element,\
      array_agg(tag) as matched_tags \
      FROM BaseElementTags INNER JOIN BaseElements USING(base_element_id)\
      WHERE author_id = $1 AND clipboard = $2\
      AND to_tsvector('russian', tag) @@ to_tsquery('russian', $3) \
      group by(base_element_id, title, source, type)",
      [req.user.id, true, query]
    )
    var results = results_tags.rows
    const size = results_title.rows.length;
    var index=-1;
    for (var i=0; i < size; i++) {
      index = results.findIndex(x => x.base_element.base_element_id === results_title.rows[i].base_element.base_element_id)
      if(index === -1) {
        results.push(results_title.rows[i]);
      } else {
        results[index].base_element.title = results_title.rows[i].base_element.title
      }
    }
    res.status(200).send(results)
  } catch (e) {
    next(e)
  }
})

router.get('/materials', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT material_id, title FROM Materials WHERE author_id = $1 and clipboard = $2 ORDER BY created;',
      [req.user.id, true]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.delete('/materials/:material_id', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    await pool.query(
      'DELETE FROM Materials WHERE material_id = $1 AND author_id = $2 and clipboard= $3;',
      [material_id, req.user.id, true]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.post('/materials', async (req, res, next) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN') 
    try {
      const title = req.body.title
      const tags = req.body.tags
      const results = await client.query(
        'INSERT INTO Materials (title, author_id, clipboard, created) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING material_id',
        [title, req.user.id, true]
      )
      for (var tag in tags) {
        if (tags.hasOwnProperty(tag)) {
          await client.query('INSERT INTO MaterialTags (tag, material_id) VALUES ($1, $2)',
            [tags[tag], results.rows[0].material_id]
          )
        }
      }
      await client.query('COMMIT')
      res.status(201).json({
        "material_id": results.rows[0].material_id
      })
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release();
  }
})

router.get('/questions', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT question_id, text FROM Questions WHERE author_id = $1 and clipboard = $2 ORDER BY created;',
      [req.user.id, true]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.delete('/questions/:question_id', async (req, res, next) => {
  try {
    const question_id = parseInt(req.params.question_id)
    await pool.query(
      'DELETE FROM Questions WHERE question_id = $1 AND author_id = $2 and clipboard= $3;',
      [question_id, req.user.id, true]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

module.exports = router



