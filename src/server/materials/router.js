const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

const { image_checker, latex_checker } = require('../base_elements/utils')

router.get('/:material_id', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    const results_title = await pool.query(
      'SELECT title FROM Materials WHERE material_id = $1',
      [material_id]
    )
    const results = await pool.query(
      'SELECT base_element_id, title, source, type, is_pivotal FROM BaseElements INNER JOIN MaterialBaseElements USING(base_element_id) WHERE material_id = $1;',
      [material_id]
    )
    const results_tags = await pool.query('SELECT tag FROM MaterialTags WHERE material_id = $1',
      [material_id]
    )
    res.status(200).json({
      "title": results_title.rows[0].title,
      "body": results.rows,
      "tags": results_tags.rows,
    })
  } catch (e) {
    next(e)
  }
})

router.post('/:material_id', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    const title = req.body.title
    await pool.query(
      'UPDATE Materials SET title = $1 WHERE material_id = $2 AND author_id = $3',
      [title, material_id, req.user.id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.post('/:material_id/base_elements', image_checker, latex_checker, async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    const {image, latex, source, title, is_pivotal, tags} = req.body;
    const [type, body] = image ? ['image', image.buffer] : ['latex', Buffer.from(latex)];
    await pool.query('BEGIN')
    const results = await pool.query(
      'INSERT INTO BaseElements (title, author_id, body, source, type, is_pivotal, clipboard, created) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING base_element_id',
      [title, req.user.id, body, source, type, is_pivotal, false]
    )
    const results_position = await pool.query('SELECT COUNT(*) FROM MaterialBaseElements WHERE material_id = $1', 
      [material_id]
    )
    await pool.query('INSERT INTO MaterialBaseElements (material_id, position, base_element_id) VALUES ($1, $2, $3);',
      [material_id, parseInt(results_position.rows[0].count) + 1, results.rows[0].base_element_id]
    )
    for (var tag in tags) {
      if (tags.hasOwnProperty(tag)) {
        await pool.query('INSERT INTO BaseElementTags (tag, author_id, created) VALUES ($1, $2, CURRENT_TIMESTAMP)',
          [tags[tag], author_id]
        )
      }
    }
    await pool.query('COMMIT')
    res.status(201).json({
      "base_element_id": results.rows[0].base_element_id
    })
  } catch (e) {
    await pool.query('ROLLBACK')
    next(e)
  }
})

router.delete('/:material_id/base_elements/:base_element_id', async (req, res, next) => {
  try {
    await pool.query('BEGIN')
    const material_id = parseInt(req.params.material_id)
    const base_element_id = parseInt(req.params.base_element_id)
    const results = await pool.query ('DELETE FROM MaterialBaseElements WHERE base_element_id = $1 AND material_id = $2 RETURNING position',
      [base_element_id, material_id]
    )
    await pool.query('UPDATE MaterialBaseElements SET position = position - 1 WHERE material_id = $1 AND position >= $2',
      [material_id, parseInt(results.rows[0].position)]
    )
    await pool.query('COMMIT')
    res.status(200).send()
  } catch (e) {
    await pool.query('ROLLBACK')
    next(e)
  }
})

router.post('/:material_id/base_elements/:base_element_id/move', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    const base_element_id = parseInt(req.params.base_element_id)
    const new_position = parseInt(req.body.position)
    await pool.query('BEGIN')
    const results = await pool.query ('SELECT position FROM MaterialBaseElements WHERE material_id = $1 AND base_element_id = $2',
      [material_id, base_element_id]
    )
    const old_position = parseInt(results.rows[0].position)
    if (new_position < old_position) {
      await pool.query('UPDATE MaterialBaseElements SET position = position + 1 WHERE material_id = $1 AND position BETWEEN $2 AND $3',
        [material_id, new_position, old_position - 1]
      )
    } else {
      await pool.query('UPDATE MaterialBaseElements SET position = position - 1 WHERE material_id = $1 AND position BETWEEN $2 AND $3',
        [material_id, old_position + 1, new_position]
      )
    }
    await pool.query('UPDATE MaterialBaseElements SET position = $1 WHERE material_id = $2 AND base_element_id = $3',
      [new_position, material_id, base_element_id]
    )
    await pool.query('COMMIT')
    res.status(200).send()
  } catch (e) {
    await pool.query('ROLLBACK')
    next(e)
  }
})

router.post('/:material_id/base_elements/:base_element_id/copy_to_clipboard', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    await pool.query('INSERT INTO BaseElements (title, category, type, is_pivotal, body, source, author_id, created, clipboard) SELECT title, category, type, is_pivotal, body, source, $1, CURRENT_TIMESTAMP, $2 FROM BaseElements WHERE base_element_id = $3',
      [req.user.id, true, base_element_id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
