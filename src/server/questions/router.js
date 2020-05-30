const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

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
        "SELECT json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        ts_headline('russian', q.text, tq) as matches, \
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM to_tsquery('russian', $2) as tq, Questions as q,\
        Exams e, ExamQuestions eq\
        WHERE ((e.exam_id = eq.exam_id AND q.question_id = eq.question_id AND e.author_id = $1)\
        AND to_tsvector('russian', q.text) @@ tq", 
        [req.user.id, query, true]
      )
      results_tags = await pool.query( 
        "SELECT json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        array_agg(tag) as matched_tags, \
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM to_tsquery('russian', $2) as tq, Questions as q, Exams e, ExamQuestions eq, QuestionTags qt\
        WHERE e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND e.author_id = $1\
        AND qt.question_id = q.question_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(q.question_id, q.text, e.exam_id, e.title, e.professor)",
        [req.user.id, query]
      )
    }
    if (groups_exams) {
      results_title = await pool.query(
        "SELECT json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        ts_headline('russian', q.text, tq) as matches, \
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM to_tsquery('russian', $2) as tq, Questions as q, Exams e, ExamQuestions eq, GroupMembers mg\
        WHERE e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND e.group_id = mg.group_id AND mg.user_id = $1\
        AND to_tsvector('russian', q.text) @@ tq", 
        [req.user.id, query]
      )
      results_tags = await pool.query( 
        "SELECT json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        array_agg(tag) as matched_tags, \
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM to_tsquery('russian', $2) as tq, Questions as q, Exams e, ExamQuestions eq, GroupMembers mg, QuestionTags qt\
        WHERE e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND e.group_id = mg.group_id AND mg.user_id = $1\
        AND qt.question_id = q.question_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(q.question_id, q.text, e.exam_id, e.title, e.professor)",
        [req.user.id, query]
      )
    }
    if (global_exams) {
      results_title = await pool.query(
        "SELECT json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        ts_headline('russian', q.text, tq) as matches, \
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM to_tsquery('russian', $2) as tq, Questions as q, Exams e, ExamQuestions eq, GroupMembers mg\
        WHERE e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND ((e.author_id IS NULL AND e.group_id = mg.group_id AND mg.user_id != $1) OR\
        (e.author_id != $1 AND e.author_id IS NOT NULL))\
        AND to_tsvector('russian', q.text) @@ tq", 
        [req.user.id, query]
      )
      results_tags = await pool.query( 
        "SELECT  json_build_object('question_id', q.question_id, 'text', q.text) as question,\
        array_agg(tag) as matched_tags, \
        json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam\
        FROM to_tsquery('russian', $2) as tq, Questions as q, Exams e, ExamQuestions eq, QuestionTags qt, GroupMembers mg\
        WHERE e.exam_id = eq.exam_id AND q.question_id = eq.question_id \
        AND ((e.author_id IS NULL AND e.group_id = mg.group_id AND mg.user_id != $1) OR\
        (e.author_id != $1 AND e.author_id IS NOT NULL))\
        AND qt.question_id = q.question_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(q.question_id, q.text, e.exam_id, e.title, e.professor)",
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
      index = results.findIndex(x => x.question.question_id === results_title.rows[i].question.question_id)
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

router.get('/:question_id', async (req, res, next) => {
  try {
    const question_id = parseInt(req.params.question_id)
    const results_text = await pool.query(
      'SELECT text FROM Questions WHERE question_id = $1',
      [question_id]
    )
    if (results_text.rows.length === 0) {
      return res.status(404).send('Вопрос не найден')
    }
    const results = await pool.query(
      'SELECT material_id, title FROM Materials INNER JOIN QuestionMaterials USING(material_id)\
       WHERE question_id = $1 ORDER BY position;',
      [question_id]
    )
    const results_tags = await pool.query('SELECT tag FROM QuestionTags WHERE question_id = $1',
      [question_id]
    )
    var tags = []
    var size = results_tags.rows.length
    for(var i = 0; i < size; i++) {
      tags.push(results_tags.rows[i].tag)
    }
    res.status(200).json({
      "text": results_text.rows[0].text,
      "tags": tags,
      "materials": results.rows
    })
  } catch (e) {
    next(e)
  }
})

router.post('/:question_id', async (req, res, next) => {
  const client = await pool.connect() 
  try {
    await client.query('BEGIN')
    try {
      const question_id = parseInt(req.params.question_id)
      const text = req.body.text
      const tags = req.body.tags
      const results = await client.query(
        'SELECT * FROM Questions WHERE question_id = $1 AND author_id = $2',
        [question_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
      if (text) {
        await client.query(
          'UPDATE Questions SET text = $1 WHERE question_id = $2 AND author_id = $3\
           RETURNING question_id',
          [text, question_id, req.user.id]
        )
      }
      if (tags) {
        await client.query(
          'DELETE FROM QuestionTags WHERE question_id = $1',
          [question_id]
        )
        for (var tag in tags) {
          if (tags.hasOwnProperty(tag)) {
            await client.query('INSERT INTO QuestionTags (tag, question_id) VALUES ($1, $2)',
              [tags[tag], question_id]
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

router.post('/:question_id/materials', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const question_id = parseInt(req.params.question_id)
      const title = req.body.title
      const tags = req.body.tags
      var results = await client.query(
        'SELECT * FROM Questions WHERE question_id = $1 AND author_id = $2',
        [question_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
      results = await client.query(
        'INSERT INTO Materials (title, author_id, clipboard, created)\
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING material_id',
        [title, req.user.id, false]
      )
      const results_position = await pool.query(
        'SELECT COUNT(*) FROM QuestionMaterials WHERE question_id = $1', 
        [question_id]
      )
      await client.query(
        'INSERT INTO QuestionMaterials (question_id, position, material_id) VALUES ($1, $2, $3);',
        [question_id, parseInt(results_position.rows[0].count) + 1, results.rows[0].material_id]
      )
      for (var tag in tags) {
        if (tags.hasOwnProperty(tag)) {
          await client.query(
            'INSERT INTO MaterialTags (tag, material_id) VALUES ($1, $2)',
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
    client.release()
  }
})

router.delete('/:question_id/materials/:material_id', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const question_id = parseInt(req.params.question_id)
      var results = await client.query(
        'SELECT * FROM Questions WHERE question_id = $1 AND author_id = $2',
        [question_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
      const material_id = parseInt(req.params.material_id)
      results = await pool.query (
        'DELETE FROM QuestionMaterials WHERE material_id = $1 AND question_id = $2 RETURNING position',
        [material_id, question_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Материал не найден')
      }
      await client.query(
        'UPDATE QuestionMaterials SET position = position - 1 WHERE question_id = $1 AND position >= $2',
        [question_id, parseInt(results.rows[0].position)]
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

router.post('/:question_id/materials/:material_id/move', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const question_id = parseInt(req.params.question_id)
      const material_id = parseInt(req.params.material_id)
      const new_position = parseInt(req.body.position)
      var results = await client.query(
        'SELECT * FROM Questions WHERE question_id = $1 AND author_id = $2',
        [question_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
      results = await client.query (
        'SELECT position FROM QuestionMaterials \
        WHERE question_id = $1 AND material_id = $2',
        [question_id, material_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Материал не найден')
      }
      const old_position = parseInt(results.rows[0].position)
      if (new_position < old_position) {
        await client.query(
        'UPDATE QuestionMaterials SET position = position + 1\
         WHERE question_id = $1 AND position BETWEEN $2 AND $3',
          [question_id, new_position, old_position - 1]
        )
      } else {
        await client.query(
          'UPDATE QuestionMaterials SET position = position - 1\
           WHERE question_id = $1 AND position BETWEEN $2 AND $3',
          [question_id, old_position + 1, new_position]
        )
      }
      await client.query(
        'UPDATE QuestionMaterials SET position = $1\
         WHERE question_id = $2 AND material_id = $3',
        [new_position, question_id, material_id]
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

router.post('/:question_id/materials/:material_id/copy_to_clipboard', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const material_id = parseInt(req.params.material_id)
      const results =  await client.query(
        'INSERT INTO Materials (title, author_id, created, clipboard, forks_from)\
        SELECT title, $1, CURRENT_TIMESTAMP, $2, $3 FROM Materials\
        WHERE material_id = $3 RETURNING material_id',
        [req.user.id, true, material_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Mатериал не найден')
      }
      const base_elements = await client.query(
        'SELECT array_agg(base_element_id) as b FROM MaterialBaseElements WHERE material_id = $1',
        [material_id]
      )
      if (base_elements.rows[0].b) {
        for (l = 0; l < base_elements.rows[0].b.length; l++) {
          var new_base_element = await client.query(
            'INSERT INTO BaseElements (title, type, is_pivotal, body, source, author_id, created, forks_from)\
            SELECT title, type, is_pivotal, body, source, $1, CURRENT_TIMESTAMP, base_element_id FROM BaseElements\
            WHERE base_element_id = $2 RETURNING base_element_id',
            [req.user.id, base_elements.rows[0].b[l]]
          )
          await client.query(
            'INSERT INTO MaterialBaseElements (material_id, position, base_element_id)\
            SELECT $1, position, $2 FROM MaterialBaseElements\
            WHERE material_id = $3 AND base_element_id = $4',
            [results.rows[0].material_id, new_base_element.rows[0].base_element_id, material_id, base_elements.rows[0].b[l] ]
          )
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

router.post('/:question_id/copy_to_exam', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      var question_id = parseInt(req.params.question_id)
      const exam_id = parseInt(req.body.exam_id)
      const position = parseInt(req.body.position)
      var results = await client.query(
        'SELECT * FROM Exams WHERE exam_id = $1 AND author_id = $2',
        [exam_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Экзамен не найден')
      }
      results = await client.query(
        'SELECT * FROM Questions WHERE question_id = $1',
        [question_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
      const new_question = await pool.query(
        'INSERT INTO Questions (text, author_id, created, clipboard)\
        SELECT text, $1, CURRENT_TIMESTAMP, $2 FROM Questions\
        WHERE question_id = $3 AND clipboard = false RETURNING question_id',
        [req.user.id, false, question_id]
      )
      if (new_question.rows.length !== 0) {
        const materials = await client.query(
          'SELECT array_agg(material_id) as m FROM QuestionMaterials WHERE question_id = $1',
          [question_id]
        )
        if (materials.rows[0].m) {
          for (k = 0; k < materials.rows[0].m.length; k++) {
            var new_material = await client.query(
              'INSERT INTO Materials (title, author_id, created, forks_from)\
              SELECT title, $1, CURRENT_TIMESTAMP, material_id FROM Materials\
              WHERE material_id = $2 RETURNING material_id',
              [req.user.id, materials.rows[0].m[k]]
            )
            await client.query(
              'INSERT INTO QuestionMaterials (question_id, position, material_id)\
              SELECT $1, position, $2 FROM QuestionMaterials\
              WHERE question_id = $3 AND material_id = $4',
              [new_question.rows[0].question_id, new_material.rows[0].material_id, question_id, materials.rows[0].m[k] ]
            )
            const base_elements = await client.query(
              'SELECT array_agg(base_element_id) as b FROM MaterialBaseElements WHERE material_id = $1',
              [materials.rows[0].m[k]]
            )
            if (base_elements.rows[0].b) {
              for (l = 0; l < base_elements.rows[0].b.length; l++) {
                var new_base_element = await client.query(
                  'INSERT INTO BaseElements (title, type, is_pivotal, body, source, author_id, created, forks_from)\
                  SELECT title, type, is_pivotal, body, source, $1, CURRENT_TIMESTAMP, base_element_id FROM BaseElements\
                  WHERE base_element_id = $2 RETURNING base_element_id',
                  [req.user.id, base_elements.rows[0].b[l]]
                )
                await client.query(
                  'INSERT INTO MaterialBaseElements (material_id, position, base_element_id)\
                  SELECT $1, position, $2 FROM MaterialBaseElements\
                  WHERE material_id = $3 AND base_element_id = $4',
                  [new_material.rows[0].material_id, new_base_element.rows[0].base_element_id, materials.rows[0].m[k], base_elements.rows[0].b[l] ]
                )
              }
            }
          }
        }
        question_id = new_question.rows[0].question_id
      }
      results = await client.query(
        'INSERT INTO ExamQuestions (exam_id, position, question_id)\
        VALUES ($1, $2, $3) RETURNING position',
        [exam_id, position, question_id]
      )     
      await client.query(
        'UPDATE Questions SET clipboard = $1 WHERE question_id = $2',
        [false, question_id]
      )
      await client.query(
        'UPDATE ExamQuestions SET position = position + 1 \
        WHERE exam_id = $1 AND position >= $2 AND question_id != $3',
        [exam_id, parseInt(results.rows[0].position), question_id]
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

module.exports = router
