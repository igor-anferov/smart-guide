const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

router.get('/', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT exam_id, title, professor FROM Exams WHERE author_id = $1 AND group_id IS NULL AND delete_mark = false',
      [req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const {title, professor, tags} = req.body;
      const results = await client.query(
        'INSERT INTO Exams (title, professor, author_id, created)\
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING exam_id',
        [title, professor, req.user.id]
      )
      for (var tag in tags) {
        if (tags.hasOwnProperty(tag)) {
          await client.query('INSERT INTO ExamTags (tag, exam_id) VALUES ($1, $2)',
            [tags[tag], results.rows[0].exam_id]
          )
        }
      }
      await client.query('COMMIT')
      res.status(201).json({
        exam_id: results.rows[0].exam_id
      })
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.delete('/:exam_id', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const exam_id = parseInt(req.params.exam_id)
      const count_forks = await client.query(
        'SELECT COUNT(1) FROM Exams WHERE forks_from = $1',
        [exam_id]
      )
      const count_questions = await client.query(
        'SELECT COUNT(1) FROM ExamQuestions WHERE exam_id = $1',
        [exam_id]
      )
      if (count_questions.rows[0].count === 0 && count_forks.rows[0].count === 0) {
        await client.query(
          'DELETE FROM Exams WHERE exam_id = $1 AND author_id = $2 AND group_id IS NULL',
          [exam_id, req.user.id]
        )
      } else {
        await client.query(
          'UPDATE Exams SET delete_mark = $1 WHERE exam_id = $2 AND author_id = $3 AND group_id IS NULL',
          [true, exam_id, req.user.id]
        )
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
        "SELECT json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam,\
        ts_headline('russian', e.title || ' ' || e.professor, tq) as matches\
        FROM to_tsquery('russian', $2) as tq, Exams e\
        WHERE e.author_id = $1 AND to_tsvector('russian', e.title || ' ' || e.professor) @@ tq", 
        [req.user.id, query]
      )
      results_tags = await pool.query( 
        "SELECT json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam,\
        array_agg(tag) as matched_tags\
        FROM to_tsquery('russian', $2), Exams e, ExamTags et\
        WHERE e.author_id = $1 AND et.exam_id = e.exam_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(e.exam_id, e.title, e.professor)",
        [req.user.id, query]
      )
    }
    if (groups_exams) {
      results_title = await pool.query(
        "SELECT json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam,\
        ts_headline('russian', e.title || ' ' || e.professor, tq) as matches\
        FROM to_tsquery('russian', $2) as tq, Exams e, GroupMembers mg\
        WHERE e.group_id = mg.group_id AND mg.user_id = $1\
        AND to_tsvector('russian', e.title || ' ' || e.professor) @@ tq", 
        [req.user.id, query]
      )
      results_tags = await pool.query( 
        "SELECT json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam,\
        array_agg(tag) as matched_tags\
        FROM to_tsquery('russian', $2) as tq, Exams e, GroupMembers mg, ExamTags et\
        WHERE e.group_id = mg.group_id AND mg.user_id = $1\
        AND et.exam_id = e.exam_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(e.exam_id, e.title, e.professor)",
        [req.user.id, query]
      )
    }
    if (global_exams) {
      results_title = await pool.query(
        "SELECT json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam,\
        ts_headline('russian', e.title || ' ' || e.professor, tq) as matches\
        FROM to_tsquery('russian', $2) as tq, Exams e, GroupMembers mg\
        WHERE ((e.author_id IS NULL AND e.group_id = mg.group_id AND mg.user_id != $1) OR\
        (e.author_id != $1 AND e.author_id IS NOT NULL))\
        AND to_tsvector('russian', e.title || ' ' || e.professor) @@ tq", 
        [req.user.id, query]
      )
      results_tags = await pool.query( 
        "SELECT json_build_object('exam_id', e.exam_id, 'title', e.title, 'professor', e.professor) as exam,\
        array_agg(tag) as matched_tags\
        FROM to_tsquery('russian', $2) as tq, Exams e, ExamTags et, GroupMembers mg\
        WHERE ((e.author_id IS NULL AND e.group_id = mg.group_id AND mg.user_id != $1) OR\
        (e.author_id != $1 AND e.author_id IS NOT NULL))\
        AND et.exam_id = e.exam_id\
        AND to_tsvector('russian', tag) @@ to_tsquery('russian', $2) \
        GROUP BY(e.exam_id, e.title, e.professor)",
        [req.user.id, query]
      )
    }
    var size = results_tags.rows.length
    for (var k = 0; k < size; k++) {
      rank = await pool.query(
        'SELECT COUNT(1) FROM Exams WHERE forks_from = $1',
        [results_tags.rows[k].exam.exam_id]
      )
      results_tags.rows[k].rank = results_tags.rows[k].matched_tags.length * 0.3 + rank.rows[0].count * 0.4
    }
    var results = results_tags.rows
    size = results_title.rows.length
    var matches_title = [];
    var index = -1;
    for (var i = 0; i < size; i++) {
      matches_title = results_title.rows[i].matches.match(/<b>[^\s]*<\/b>/g)
      for(var j = 0; j < matches_title.length; j++) {
        matches_title[j] = matches_title[j].slice(3, matches_title[j].length-4)
      }
      results_title.rows[i].matches = matches_title;
      index = results.findIndex(x => x.exam.exam_id === results_title.rows[i].exam.exam_id)
      if(index === -1) {
        rank = await pool.query(
          'SELECT COUNT(1) FROM Exams WHERE forks_from = $1',
          [results_title.rows[i].exam.exam_id]
        )
        results_title.rows[i].rank = matches_title.length * 0.4 + rank.rows[0].count * 0.4 
        results.push(results_title.rows[i])
      } else {
        results[index].rank += matches_title.length * 0.4 + rank.rows[0].count * 0.4
        results[index].matches = results_title.rows[i].matches
      }
    }
    results.sort(function(a, b) {
      return b.rank - a.rank
    })
    /*var result = results.map( function (r) {
      delete r.rank
    })*/
    res.status(200).send(results)
  } catch (e) {
    next(e)
  }
})

router.get('/:exam_id', async (req, res, next) => {
  try {
    const exam_id = parseInt(req.params.exam_id)
    const results_header = await pool.query(
      'SELECT title, professor FROM Exams WHERE exam_id = $1',
      [exam_id]
    )
    if (results_header.rows.length === 0) {
      return res.status(404).send('Экзамен не найден')
    }
    const results = await pool.query(
      'SELECT question_id, text FROM Questions INNER JOIN ExamQuestions USING(question_id)\
       WHERE exam_id = $1 ORDER BY position;',
      [exam_id]
    )
    const results_tags = await pool.query('SELECT tag FROM ExamTags WHERE exam_id = $1',
      [exam_id]
    )
    var tags = []
    var size = results_tags.rows.length
    for(var i = 0; i < size; i++) {
      tags.push(results_tags.rows[i].tag)
    }
    res.status(200).json({
      "title": results_header.rows[0].title,
      "professor": results_header.rows[0].professor,
      "tags": tags,
      "questions": results.rows
    })
  } catch (e) {
    next(e)
  }
})

router.post('/:exam_id', async (req, res, next) => {
  const client = await pool.connect() 
  try {
    await client.query('BEGIN')
    try {
      const exam_id = parseInt(req.params.exam_id)
      const { tags, ...args } = req.body
      const results = await client.query(
        'SELECT * FROM Exams WHERE exam_id = $1 AND author_id = $2\
        OR group_id IN (SELECT group_id FROM GroupMembers WHERE user_id = $2)',
        [exam_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Экзамен не найден')
      }
      let arg_num = 0;
      if (args.title || args.professor) {
        await client.query(
          `UPDATE Exams SET ${
            Object.keys(args)
              .map((k) => k + ` = $${++arg_num}`)
              .join()
          } WHERE exam_id = $${++arg_num}`,
          [...Object.values(args), exam_id]
        )
      }
      if (tags) {
        await client.query(
          'DELETE FROM ExamTags WHERE exam_id = $1',
          [exam_id]
        )
        for (var tag in tags) {
          if (tags.hasOwnProperty(tag)) {
            await client.query('INSERT INTO ExamTags (tag, exam_id) VALUES ($1, $2)',
              [tags[tag], exam_id]
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

router.post('/:exam_id/questions', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const exam_id = parseInt(req.params.exam_id)
      const text = req.body.text
      const tags = req.body.tags
      var results = await client.query(
        'SELECT * FROM Exams WHERE exam_id = $1 AND author_id = $2\
        OR group_id IN (SELECT group_id FROM GroupMembers WHERE user_id = $2)',
        [exam_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Экзамен не найден')
      }
      results = await client.query(
        'INSERT INTO Questions (text, author_id, clipboard, created)\
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING question_id',
        [text, req.user.id, false]
      )
      const results_position = await pool.query(
        'SELECT COUNT(*) FROM ExamQuestions WHERE exam_id = $1', 
        [exam_id]
      )
      await client.query(
        'INSERT INTO ExamQuestions (exam_id, position, question_id) VALUES ($1, $2, $3);',
        [exam_id, parseInt(results_position.rows[0].count) + 1, results.rows[0].question_id]
      )
      for (var tag in tags) {
        if (tags.hasOwnProperty(tag)) {
          await client.query(
            'INSERT INTO QuestionTags (tag, question_id) VALUES ($1, $2)',
            [tags[tag], results.rows[0].question_id]
          )
        }
      }
      await client.query('COMMIT')
      res.status(201).json({
        "question_id": results.rows[0].question_id
      })
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.delete('/:exam_id/questions/:question_id', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const exam_id = parseInt(req.params.exam_id)
      var results = await client.query(
        'SELECT * FROM Exams WHERE exam_id = $1 AND author_id = $2\
        OR group_id IN (SELECT group_id FROM GroupMembers WHERE user_id = $2)',
        [exam_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Экзамен не найден')
      }
      const question_id = parseInt(req.params.question_id)
      results = await pool.query (
        'DELETE FROM ExamQuestions WHERE question_id = $1 AND exam_id = $2 RETURNING position',
        [question_id, exam_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
      await client.query(
        'UPDATE ExamQuestions SET position = position - 1 WHERE exam_id = $1 AND position >= $2',
        [exam_id, parseInt(results.rows[0].position)]
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

router.post('/:exam_id/questions/:question_id/move', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const question_id = parseInt(req.params.question_id)
      const exam_id = parseInt(req.params.exam_id)
      const new_position = parseInt(req.body.position)
      var results = await client.query(
        'SELECT * FROM Exams WHERE exam_id = $1 AND author_id = $2\
        OR group_id IN (SELECT group_id FROM GroupMembers WHERE user_id = $2)',
        [exam_id, req.user.id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Экзамен не найден')
      }
      results = await client.query (
        'SELECT position FROM ExamQuestions\
        WHERE exam_id = $1 AND question_id = $2',
        [exam_id, question_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
      const old_position = parseInt(results.rows[0].position)
      if (new_position < old_position) {
        await client.query(
        'UPDATE ExamQuestions SET position = position + 1\
         WHERE exam_id = $1 AND position BETWEEN $2 AND $3',
          [exam_id, new_position, old_position - 1]
        )
      } else {
        await client.query(
          'UPDATE ExamQuestions SET position = position - 1\
           WHERE exam_id = $1 AND position BETWEEN $2 AND $3',
          [exam_id, old_position + 1, new_position]
        )
      }
      await client.query(
        'UPDATE ExamQuestions SET position = $1\
         WHERE exam_id = $2 AND question_id = $3',
        [new_position, exam_id, question_id]
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

router.post('/:exam_id/questions/:question_id/copy_to_clipboard', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const question_id = parseInt(req.params.question_id)
      const results =  await client.query(
        'INSERT INTO Questions (text, author_id, created, clipboard, forks_from)\
        SELECT text, $1, CURRENT_TIMESTAMP, $2, $3 FROM Questions\
        WHERE question_id = $3 RETURNING question_id',
        [req.user.id, true, question_id]
      )
      if (results.rows.length === 0) {
        return res.status(404).send('Вопрос не найден')
      }
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
            [results.rows[0].question_id, new_material.rows[0].material_id, question_id, materials.rows[0].m[k] ]
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
      await client.query('COMMIT')
      res.status(201).json({
        "question_id": results.rows[0].question_id
      })
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

copy_exams = async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const exam_id = req.params.exam_id
    const group_id = req.body.group_id
    try {
      if (group_id) {
        var new_exam = await client.query(
          'INSERT INTO Exams (group_id, title, professor, created, forks_from)\
          SELECT $1, title, professor, CURRENT_TIMESTAMP, exam_id FROM Exams\
          WHERE exam_id = $2 RETURNING exam_id',
          [group_id, exam_id]
        )
      } else {
        var new_exam = await client.query(
          'INSERT INTO Exams (author_id, title, professor, created, forks_from)\
          SELECT $1, title, professor, CURRENT_TIMESTAMP, exam_id FROM Exams\
          WHERE exam_id = $2 RETURNING exam_id',
          [req.user.id, exam_id]
        )
      }
      if (new_exam.rows.length === 0) {
        return res.status(404).send('Экзамен не найден')
      }
      const questions = await client.query(
        'SELECT array_agg(question_id) as q FROM ExamQuestions WHERE exam_id = $1',
        [exam_id]
      )
      if (questions.rows[0].q) {
        for (j = 0; j < questions.rows[0].q.length; j++) {
          var new_question = await client.query(
            'INSERT INTO Questions (text, author_id, created, forks_from)\
            SELECT text, $1, CURRENT_TIMESTAMP, question_id FROM Questions\
            WHERE question_id = $2 RETURNING question_id',
            [req.user.id, questions.rows[0].q[j]]
          )
          await client.query(
            'INSERT INTO ExamQuestions (exam_id, position, question_id)\
            SELECT $1, position, $2 FROM ExamQuestions\
            WHERE exam_id = $3 AND question_id = $4',
            [new_exam.rows[0].exam_id, new_question.rows[0].question_id, exam_id, questions.rows[0].q[j] ]
          )
          const materials = await client.query(
            'SELECT array_agg(material_id) as m FROM QuestionMaterials WHERE question_id = $1',
            [questions.rows[0].q[j]]
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
                [new_question.rows[0].question_id, new_material.rows[0].material_id, questions.rows[0].q[j], materials.rows[0].m[k] ]
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
        }
      }
      await client.query('COMMIT')
      res.status(201).json({
        "exam_id": new_exam.rows[0].exam_id
      })   
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
}

router.post('/:exam_id/copy', copy_exams)
router.post('/:exam_id/copy_to_group', copy_exams)

router.post('/:exam_id/material_to_study', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const exam_id = parseInt(req.params.exam_id)
    const success_threshold = req.body.success_threshold
    const consecutively = req.body.consecutively
    try {
      const results = await client.query( 
        "SELECT m.material_id as material_id, m.title as title,\
         json_build_object('base_element_id', b.base_element_id, 'title', b.title, 'source', b.source, 'type', b.type) as base_elements\
         FROM BaseElements b, MaterialBaseElements mb, Materials m, QuestionMaterials qm, Questions q, ExamQuestions eq, Exams e\
         WHERE e.exam_id = $1 AND e.exam_id = eq.exam_id AND eq.question_id = q.question_id\
         AND qm.question_id = q.question_id AND qm.material_id = m.material_id\
         AND mb.material_id = m.material_id AND b.base_element_id = mb.base_element_id\
         AND b.is_pivotal = $2",
        [exam_id, true]
      )
      const success = await client.query(
        'SELECT array_agg(material_id) as materials FROM StudyMaterials WHERE exam_id = $1\
         AND user_id = $2 AND ' + ((consecutively) ? 'success_consecutively' : 'success_inconsistently') + ' >= $3',
        [exam_id, req.user.id, success_threshold]
      )
      var materials = results.rows
      var study_materials = (success.rows[0].materials) ? success.rows[0].materials : []
      for (var i = 0; i < materials.length; i++) {
        if (!materials[i].base_elements || study_materials.includes(materials[i].material_id)) {
          materials.splice(i, i)
        } 
      }     
      await client.query('COMMIT')
      if (materials.length === 0) {
        if (study_materials.length === 0) {
          return res.status(404).send('Учебные материалы не найдены')
        } else {
          return res.status(204).send('Все учебные материалы изучены')
        }
      }
      var material = materials[Math.round(Math.random()*materials.length)]
      const study = await client.query(
        'SELECT material_id FROM StudyMaterials WHERE material_id = $1 AND user_id = $2',
        [material.material_id, req.user.id]
      )
      if (study.rows.length === 0) {
        await client.query(
          'INSERT INTO StudyMaterials (material_id, exam_id, user_id, success_consecutively, success_inconsistently)\
           VALUES ($1, $2, $3, 0, 0)',
           [material.material_id, exam_id, req.user.id]
        )
      }
      delete material.material_id
      res.status(200).send(material)
    } catch(e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.post('/:exam_id/materials/:material_id/study_result', async (req, res, next) => {
  try {
    const exam_id = parseInt(req.params.exam_id)
    const material_id = parseInt(req.params.material_id)
    const successful = req.body.successful
    await pool.query(
      'UPDATE StudyMaterials SET success_consecutively = ' + ((successful) ? 'success_consecutively + 1' : '0') +
      ', success_inconsistently = success_inconsistently + 1\
       WHERE material_id = $1 AND exam_id = $2 AND user_id = $3',
      [material_id, exam_id, req.user.id]
    )
    res.status(200).send()
  } catch(e) {
    next(e)
  }
})

router.post('/:exam_id/reset_study_progress', async (req, res, next) => {
  try {
    const exam_id = parseInt(req.params.exam_id)
    await pool.query(
      'DELETE FROM StudyMaterials WHERE exam_id = $1 AND user_id = $2',
      [exam_id, req.user.id]
    )
    res.status(200).send()
  } catch(e) {
    next(e)
  }
})

module.exports = router
