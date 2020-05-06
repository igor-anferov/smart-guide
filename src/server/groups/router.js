const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

router.get('/:group_id/exams', async (req, res, next) => {
  try {
    const group_id = parseInt(req.params.group_id)
    const results = await pool.query(
      'SELECT exam_id, title, professor FROM Exams WHERE group_id = $1 AND group_id IN (SELECT group_id FROM GroupMembers WHERE user_id = $2);',
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
      await client.query(
        'DELETE FROM GroupMembers WHERE user_id = $1 AND group_id = $2',
        [req.user.id, group_id]
      )
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

router.get('/:group_id/members', async (req, res, next) => {
  try {
    const group_id = req.params.group_id
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
      await client.query(
        'DELETE FROM GroupMembers WHERE user_id = $1 AND group_id = $2',
        [user_id, group_id]
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