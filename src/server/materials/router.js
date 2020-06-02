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
    if (results_title.rows.length === 0) {
      return res.status(404).send('Материал не найден')
    }
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
      const results = await client.query(
        'SELECT * FROM Materials WHERE material_id = $1 AND author_id = $2',
        [material_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Материал не найден')
      }
      if (title) {
        await client.query(
          'UPDATE Materials SET title = $1 WHERE material_id = $2 AND author_id = $3 RETURNING material_id',
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
      var results = await client.query(
        'SELECT * FROM Materials WHERE material_id = $1 AND author_id = $2',
        [material_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Материал не найден')
      }
      results = await client.query(
        'INSERT INTO BaseElements (title, author_id, body, source, type, is_pivotal, clipboard, created)\
         VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING base_element_id',
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
      var results = await client.query(
        'SELECT * FROM Materials WHERE material_id = $1 AND author_id = $2',
        [material_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Материал не найден')
      }
      const base_element_id = parseInt(req.params.base_element_id)
      results = await pool.query ('DELETE FROM MaterialBaseElements WHERE base_element_id = $1 AND material_id = $2 RETURNING position',
        [base_element_id, material_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Базовый элемент не найден')
      }
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
      var results = await client.query(
        'SELECT * FROM Materials WHERE material_id = $1 AND author_id = $2',
        [material_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Материал не найден')
      }
      results = await client.query ('SELECT position FROM MaterialBaseElements WHERE material_id = $1 AND base_element_id = $2',
        [material_id, base_element_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Базовый элемент не найден')
      }
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
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const base_element_id = parseInt(req.params.base_element_id)
      const results =  await client.query(
        'INSERT INTO BaseElements (title, type, is_pivotal, body, source, author_id, created, clipboard)\
        SELECT title, type, is_pivotal, body, source, $1, CURRENT_TIMESTAMP, $2 FROM BaseElements\
        WHERE base_element_id = $3 RETURNING base_element_id',
        [req.user.id, true, base_element_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Базовый элемент не найден')
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

router.post('/:material_id/copy_to_question', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const question_id = parseInt(req.body.question_id)
      var material_id = parseInt(req.params.material_id)
      const position = parseInt(req.body.position)
      var results = await client.query(
        'SELECT * FROM Questions WHERE question_id = $1 AND author_id = $2',
        [question_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
      results = await client.query(
        'SELECT * FROM Materials WHERE material_id = $1',
        [material_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Материал не найден')
      }
      const new_material = await pool.query(
        'INSERT INTO Materials (title, author_id, created, clipboard)\
        SELECT title, $1, CURRENT_TIMESTAMP, $2 FROM Materials\
        WHERE material_id = $3 RETURNING material_id',
        [req.user.id, false, material_id]
      )
      if (new_material.rows.length !== 0) {
        const base_elements = await client.query(
          'SELECT array_agg(base_element_id) as b FROM MaterialBaseElements WHERE material_id = $1',
          [material_id]
        )
        if (base_elements.rows[0].b) {
          for (l = 0; l < base_elements.rows[0].b.length; l++) {
            var new_base_element = await client.query(
              'INSERT INTO BaseElements (title, type, is_pivotal, body, source, author_id, created, forks_from)\
              SELECT title, type, is_pivotal, body, source, $1, CURRENT_TIMESTAMP, base_element_id\
              FROM BaseElements WHERE base_element_id = $2 RETURNING base_element_id',
              [req.user.id, base_elements.rows[0].b[l]]
            )
            await client.query(
              'INSERT INTO MaterialBaseElements (material_id, position, base_element_id)\
              SELECT $1, position, $2 FROM MaterialBaseElements\
              WHERE material_id = $3 AND base_element_id = $4',
              [new_material.rows[0].material_id, new_base_element.rows[0].base_element_id, material_id, base_elements.rows[0].b[l] ]
            )
          }
        }
        material_id = new_material.rows[0].material_id
      }
      results = await client.query(
        'INSERT INTO QuestionMaterials (question_id, position, material_id)\
        VALUES ($1, $2, $3) RETURNING position',
        [question_id, position, material_id]
      )     
      await client.query(
        'UPDATE QuestionMaterials SET position = position + 1 \
        WHERE question_id = $1 AND position >= $2 AND material_id != $3',
        [question_id, parseInt(results.rows[0].position), material_id]
      )
      await client.query('COMMIT')
      res.status(201).json({
        "material_id": material_id
      })
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.get('/:material_id/comments', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    const results =  await pool.query(
      "SELECT comment_id, text, json_build_object('user_id', user_id, 'name', name, 'login', login, 'email', email, 'university', university, 'faculty', faculty) as author,\
       to_char(created_ts, 'YYYY-MM-DDThh:MI:SS.MSZ') as created_ts, to_char(edited_ts, 'YYYY-MM-DDThh:MI:SS.MSZ') as edited_ts, to_char(deleted_ts, 'YYYY-MM-DDThh:MI:SS.MSZ') as deleted_ts\
       FROM MaterialComments, Users WHERE user_id = author_id AND material_id = $1",
      [material_id]
    )
    var comments = results.rows
    for (var i = 0; i < comments.length; i++) {
      if(comments[i].deleted_ts) {
        delete comments[i].text
        comments[i].deleted = true
      } else {
        delete comments[i].deleted_ts
      }
      if(!comments[i].edited_ts) {
        delete comments[i].edited_ts
      }
    }
    res.status(200).send(comments)
  } catch (e) {
    next(e)
  }
})

router.post('/:material_id/comments', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const material_id = parseInt(req.params.material_id)
      const text = req.body.text
      const results =  await client.query(
        'INSERT INTO MaterialComments (text, material_id, author_id, created_ts)\
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING comment_id',
        [text, material_id, req.user.id]
      )
      await client.query('COMMIT')
      res.status(201).json({
        "comment_id": results.rows[0].comment_id
      })
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.post('/:material_id/comments/:comment_id', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    const comment_id = parseInt(req.params.comment_id)
    const text = req.body.text
    const results =  await pool.query(
      'UPDATE MaterialComments SET text = $1, edited_ts = CURRENT_TIMESTAMP\
       WHERE material_id = $2 AND comment_id = $3 AND author_id = $4',
      [text, material_id, comment_id, req.user.id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.delete('/:material_id/comments/:comment_id', async (req, res, next) => {
  try {
    const material_id = parseInt(req.params.material_id)
    const comment_id = parseInt(req.params.comment_id)
    const results =  await pool.query(
      'UPDATE MaterialComments SET deleted_ts = CURRENT_TIMESTAMP\
       WHERE material_id = $1 AND comment_id = $2 AND author_id = $3',
      [material_id, comment_id, req.user.id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

module.exports = router
