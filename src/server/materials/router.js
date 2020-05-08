const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

const { image_checker, latex_checker } = require('../base_elements/utils')

router.post('/search', async (req, res, next) => {
  var query = req.body.query
  const own_exams = req.body.own_exams
  const groups_exams = req.body.groups_exams
  const global_exams = req.body.global
  query = query.replace(/ /g, '|')
  var results_tags
  var results_title
  try {
      if (own_exams) {
      results_title = await pool.query(
        "SELECT json_build_object('material_id', m.material_id, 'title', m.title) as material,\
        ts_headline('russian', m.title, tq) as matches, \
        json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM Materials as m, to_tsquery('russian', $2) as tq, Questions as q,\
        QuestionMaterials as qm, Exams e, ExamQuestions eq\
        WHERE m.material_id = qm.material_id AND q.question_id = qm.question_id\
        AND e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND e.author_id = $1\
        AND to_tsvector('russian', m.title) @@ tq", 
        [req.user.id, query]
      )
      results_tags = await pool.query( 
        "SELECT json_build_object('material_id', m.material_id, 'title', m.title) as material,\
        array_agg(tag) as matched_tags, \
        json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM Materials as m, to_tsquery('russian', $2) as tq, Questions as q,\
        QuestionMaterials as qm, Exams e, ExamQuestions eq, MaterialTags mt\
        WHERE m.material_id = qm.material_id AND q.question_id = qm.question_id\
        AND e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND e.author_id = $1\
        AND mt.material_id = m.material_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(m.material_id, m.title,  q.question_id, q.text, e.exam_id, e.title, e.professor)",
        [req.user.id, query]
      )
    }
    if (groups_exams) {
      results_title = await pool.query(
        "SELECT json_build_object('material_id', m.material_id, 'title', m.title) as material,\
        ts_headline('russian', m.title, tq) as matches, \
        json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM Materials as m, to_tsquery('russian', $2) as tq, Questions as q,\
        QuestionMaterials as qm, Exams e, ExamQuestions eq, GroupMembers mg\
        WHERE m.material_id = qm.material_id AND q.question_id = qm.question_id\
        AND e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND e.group_id = mg.group_id AND mg.user_id = $1\
        AND to_tsvector('russian', m.title) @@ tq", 
        [req.user.id, query]
      )
      results_tags = await pool.query( 
        "SELECT json_build_object('material_id', m.material_id, 'title', m.title) as material,\
        array_agg(tag) as matched_tags, \
        json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM Materials as m, to_tsquery('russian', $2) as tq, Questions as q,\
        QuestionMaterials as qm, Exams e, ExamQuestions eq, GroupMembers mg, MaterialTags mt\
        WHERE m.material_id = qm.material_id AND q.question_id = qm.question_id\
        AND e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND e.group_id = mg.group_id AND mg.user_id = $1\
        AND mt.material_id = m.material_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(m.material_id, m.title,  q.question_id, q.text, e.exam_id, e.title, e.professor)",
        [req.user.id, query]
      )
    }
    if (global_exams) {
      results_title = await pool.query(
        "SELECT json_build_object('material_id', m.material_id, 'title', m.title) as material,\
        ts_headline('russian', m.title, tq) as matches, \
        json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM Materials as m, to_tsquery('russian', $2) as tq, Questions as q,\
        QuestionMaterials as qm, Exams e, ExamQuestions eq, GroupMembers mg\
        WHERE m.material_id = qm.material_id AND q.question_id = qm.question_id\
        AND e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND ((e.author_id IS NULL AND e.group_id = mg.group_id AND mg.user_id != $1) OR\
        (e.author_id != $1 AND e.author_id IS NOT NULL))\
        AND to_tsvector('russian', m.title) @@ tq", 
        [req.user.id, query]
      )
      results_tags = await pool.query( 
        "SELECT json_build_object('material_id', m.material_id, 'title', m.title) as material,\
        array_agg(tag) as matched_tags, \
        json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM Materials as m, to_tsquery('russian', $2) as tq, Questions as q,\
        QuestionMaterials as qm, Exams e, ExamQuestions eq, MaterialTags mt, GroupMembers mg\
        WHERE m.material_id = qm.material_id AND q.question_id = qm.question_id\
        AND e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND ((e.author_id IS NULL AND e.group_id = mg.group_id AND mg.user_id != $1) OR\
        (e.author_id != $1 AND e.author_id IS NOT NULL))\
        AND mt.material_id = m.material_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(m.material_id, m.title,  q.question_id, q.text, e.exam_id, e.title, e.professor)",
        [req.user.id, query]
      )
    }
    var results = results_tags.rows
    const size = results_title.rows.length;
    var matches_title = [];
    var index = -1;
    for (var i = 0; i < size; i++) {
      matches_title = results_title.rows[i].matches.match(/<b>[^\s]*<\/b>/g)
      for(var j = 0; j < matches_title.length; j++) {
        matches_title[j] = matches_title[j].slice(3, matches_title[j].length-4)
      }
      results_title.rows[i].matches = matches_title;
      index = results.findIndex(x => x.material.material_id === results_title.rows[i].material.material_id)
      if(index === -1) {
        results.push(results_title.rows[i])
      } else {
        results[index].matches = results_title.rows[i].matches
      }
    }
    res.status(200).send(results)
  } catch (e) {
    next(e)
  }
})

router.get('/:material_id', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    const results_title = await pool.query(
      'SELECT title FROM Materials WHERE material_id = $1',
      [material_id]
    )
    const results = await pool.query(
      'SELECT base_element_id, title, source, type, is_pivotal FROM BaseElements INNER JOIN MaterialBaseElements USING(base_element_id) WHERE material_id = $1 ORDER BY position;',
      [material_id]
    )
    const results_tags = await pool.query('SELECT tag FROM MaterialTags WHERE material_id = $1',
      [material_id]
    )
    var tags = []
    var size = results_tags.rows.length
    for(var i = 0; i < size; i++) {
      tags.push(results_tags.rows[i].tag)
    }
    res.status(200).json({
      "title": results_title.rows[0].title,
      "tags": tags,
      "base_elements": results.rows
    })
  } catch (e) {
    next(e)
  }
})

router.post('/:material_id', async (req, res, next) => {
  const client = await pool.connect() 
  try {
    await client.query('BEGIN')
    try {
      const material_id = parseInt(req.params.material_id)
      const title = req.body.title
      const tags = req.body.tags
      if (title) {
        await client.query(
          'UPDATE Materials SET title = $1 WHERE material_id = $2 AND author_id = $3',
          [title, material_id, req.user.id]
        )
      }
      if (tags) {
        await client.query(
          'DELETE FROM MaterialTags WHERE material_id = $1',
          [material_id]
        )
        for (var tag in tags) {
          if (tags.hasOwnProperty(tag)) {
            await client.query('INSERT INTO MaterialTags (tag, material_id) VALUES ($1, $2)',
              [tags[tag], material_id]
            )
          }
        }
      }
      await client.query('COMMIT')
      res.status(200).send()
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.post('/:material_id/base_elements', image_checker, latex_checker, async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const material_id = parseInt(req.params.material_id)
      const {image, latex, source, title, is_pivotal, tags} = req.body;
      const [type, body] = image ? ['image', image.buffer] : ['latex', Buffer.from(latex)];
      const results = await client.query(
        'INSERT INTO BaseElements (title, author_id, body, source, type, is_pivotal, clipboard, created) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING base_element_id',
        [title, req.user.id, body, source, type, is_pivotal, false]
      )
      const results_position = await pool.query('SELECT COUNT(*) FROM MaterialBaseElements WHERE material_id = $1', 
        [material_id]
      )
      await client.query('INSERT INTO MaterialBaseElements (material_id, position, base_element_id) VALUES ($1, $2, $3);',
        [material_id, parseInt(results_position.rows[0].count) + 1, results.rows[0].base_element_id]
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
    client.release()
  }
})

router.delete('/:material_id/base_elements/:base_element_id', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const material_id = parseInt(req.params.material_id)
      const base_element_id = parseInt(req.params.base_element_id)
      const results = await pool.query ('DELETE FROM MaterialBaseElements WHERE base_element_id = $1 AND material_id = $2 RETURNING position',
        [base_element_id, material_id]
      )
      await client.query('UPDATE MaterialBaseElements SET position = position - 1 WHERE material_id = $1 AND position >= $2',
        [material_id, parseInt(results.rows[0].position)]
      )
      await client.query('COMMIT')
      res.status(200).send()
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.post('/:material_id/base_elements/:base_element_id/move', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const material_id = parseInt(req.params.material_id)
      const base_element_id = parseInt(req.params.base_element_id)
      const new_position = parseInt(req.body.position)
      const results = await client.query ('SELECT position FROM MaterialBaseElements WHERE material_id = $1 AND base_element_id = $2',
        [material_id, base_element_id]
      )
      const old_position = parseInt(results.rows[0].position)
      if (new_position < old_position) {
        await client.query('UPDATE MaterialBaseElements SET position = position + 1 WHERE material_id = $1 AND position BETWEEN $2 AND $3',
          [material_id, new_position, old_position - 1]
        )
      } else {
        await client.query('UPDATE MaterialBaseElements SET position = position - 1 WHERE material_id = $1 AND position BETWEEN $2 AND $3',
          [material_id, old_position + 1, new_position]
        )
      }
      await client.query('UPDATE MaterialBaseElements SET position = $1 WHERE material_id = $2 AND base_element_id = $3',
        [new_position, material_id, base_element_id]
      )
      await client.query('COMMIT')
      res.status(200).send()
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.post('/:material_id/base_elements/:base_element_id/copy_to_clipboard', async (req, res, next) => {
  try {
    const base_element_id = parseInt(req.params.base_element_id)
    await pool.query(
      'INSERT INTO BaseElements (title, category, type, is_pivotal, body, source, author_id, created, clipboard)\
      SELECT title, category, type, is_pivotal, body, source, $1, CURRENT_TIMESTAMP, $2 FROM BaseElements WHERE base_element_id = $3',
      [req.user.id, true, base_element_id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
