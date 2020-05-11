const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

router.get('/:group_id/exams', async (req, res, next) => {
  try {
    const group_id = parseInt(req.params.group_id)
    const results = await pool.query(
      'SELECT exam_id, title, professor FROM Exams WHERE group_id = $1\
       AND group_id IN (SELECT group_id FROM GroupMembers WHERE user_id = $2)',
      [group_id, req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.delete('/:group_id/exams/:exam_id', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const exam_id = parseInt(req.params.exam_id)
      const group_id = parseInt(req.params.group_id)
      const count_forks = await client.query(
        'SELECT COUNT(1) FROM Exams WHERE forks_from = $1',
        [exam_id]
      )
      const count_questions = await client.query(
        'SELECT COUNT(1) FROM ExamQuestions WHERE exam_id = $1',
        [exam_id]
      )
      const creator = await client.query(
        'SELECT creator_id FROM Groups WHERE group_id = $1',
        [group_id]
      )
      console.log(creator)
      if (count_questions.rows[0].count === 0 && count_forks.rows[0].count === 0 && creator.rows[0].creator_id === req.user.id) {
        await client.query(
          'DELETE FROM Exams WHERE exam_id = $1 AND group_id = $2',
          [exam_id, group_id]
        )
      } else {
        await client.query(
          'UPDATE Exams SET delete_mark = $1 WHERE exam_id = $2 AND group_id = $3',
          [true, exam_id, group_id]
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

router.get('/', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT group_id, name FROM Groups INNER JOIN GroupMembers USING(group_id) WHERE user_id = $1',
      [req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.post ('/', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const name = req.body.name
      const users = req.body.user_ids
      const results = await client.query (
        'INSERT INTO Groups (name, creator_id, created) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING group_id',
        [name, req.user.id]
      )
      const group_id = results.rows[0].group_id
      await client.query(
        'INSERT INTO GroupMembers (group_id, user_id, date_entry) VALUES ($1, $2, CURRENT_TIMESTAMP)',
        [group_id, req.user.id]
      )
      if (users) {
        for (var user in users) {
          if (users.hasOwnProperty(user)) {
            await client.query(
              'INSERT INTO GroupMembers (group_id, user_id, date_entry) VALUES ($1, $2, CURRENT_TIMESTAMP)',
              [group_id, parseInt(users[user])]
            )
          }
        }
      }
      await client.query('COMMIT')
      res.status(201).json({
        "group_id": group_id
      })
    } catch (e) {
      await client.query('ROLLBACK')
      next(e)
    }
  } finally {
    client.release()
  }
})

router.post ('/:group_id/leave', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const group_id = req.params.group_id
    try {
      const group = await client.query(
        'SELECT * FROM Groups WHERE group_id = $1',
        [group_id]
      ) 
      if (group.rows.length === 0) {
        return res.status(404).send("Группа не найдена")
      }
      const delete_user = await client.query(
        'DELETE FROM GroupMembers WHERE user_id = $1 AND group_id = $2 RETURNING user_id',
        [req.user.id, group_id]
      )
      if (delete_user.rows.length === 0) {
        return res.status(403).send("Пользователь не состоит в данной группе")
      }
      const exams = await client.query(
        'SELECT array_agg(exam_id) as e FROM Exams WHERE group_id = $1',
        [group_id]
      )
      if (exams.rows[0].e) {
        for (i = 0; i < exams.rows[0].e.length; i++) {
          var new_exam = await client.query(
            'INSERT INTO Exams (author_id, title, professor, created, forks_from)\
            SELECT $1, title, professor, CURRENT_TIMESTAMP, exam_id FROM Exams\
            WHERE exam_id = $2 RETURNING exam_id',
            [req.user.id, exams.rows[0].e[i]]
          )
          const questions = await client.query(
            'SELECT array_agg(question_id) as q FROM ExamQuestions WHERE exam_id = $1',
            [exams.rows[0].e[i]]
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
                [new_exam.rows[0].exam_id, new_question.rows[0].question_id, exams.rows[0].e[i], questions.rows[0].q[j] ]
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

router.get('/:group_id/members', async (req, res, next) => {
  try {
    const group_id = req.params.group_id
    const group = await pool.query(
      'SELECT * FROM Groups WHERE group_id = $1',
       [group_id]
    ) 
    if (group.rows.length === 0) {
      return res.status(404).send("Группа не найдена")
    }
    const creator = await pool.query(
      'SELECT creator_id FROM Groups INNER JOIN GroupMembers USING(group_id)\
       WHERE group_id = $1 AND user_id = $2',
       [group_id, req.user.id]
    )
    if (creator.rows.length === 0) {
      return res.status(403).send("Пользователь не состоит в данной группе")
    }
    const results_users = await pool.query(
      "SELECT json_build_object('user_id', user_id, 'name', name, 'login', login, 'email', email, 'university', university, 'faculty', faculty) as user\
       FROM Users INNER JOIN GroupMembers USING(user_id) WHERE group_id = $1",
      [group_id]
    )
    var results = results_users.rows
    var size = results.length 
    for (var i = 0; i < size; i++) {
      if (results[i].user.user_id === creator.rows[0].creator_id) {
        results[i].role = 'creator'

      } else {
        results[i].role = 'member'
      }
    }
    res.status(200).send(results)
  } catch (e) {
    next(e)
  }
})

router.post ('/:group_id/members', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    try {
      const group_id = req.params.group_id
      const users = req.body.user_ids
      const group = await client.query(
        'SELECT * FROM Groups WHERE group_id = $1',
        [group_id]
      ) 
      if (group.rows.length === 0) {
        return res.status(404).send("Группа не найдена")
      }
      const members = await client.query(
        'SELECT * FROM GroupMembers WHERE group_id = $1 AND user_id = $2',
        [group_id, req.user.id]
      )
      if (members.rows.length === 0) {
        return res.status(403).send('Пользователь не является участником группы')
      }
      if (users) {
        for (var user in users) {
          if (users.hasOwnProperty(user)) {
            await client.query(
              'INSERT INTO GroupMembers (group_id, user_id, date_entry) VALUES ($1, $2, CURRENT_TIMESTAMP)',
              [group_id, parseInt(users[user])]
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

router.delete('/:group_id/members/:user_id', async (req, res, next) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const group_id = req.params.group_id
    const user_id = req.params.user_id
    try {
      const creator = await client.query(
        'SELECT creator_id FROM Groups WHERE group_id = $1',
        [group_id]
      )
      if (creator.rows[0].creator_id !== req.user.id) {
        return res.status(403).send('Пользователь не является создателем данной группы')
      }
      const delete_user = await client.query(
        'DELETE FROM GroupMembers WHERE user_id = $1 AND group_id = $2 RETURNING user_id',
        [user_id, group_id]
      )
      if (delete_user.rows.length === 0) {
        return res.status(403).send("Пользователь не состоит в данной группе")
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

module.exports = router