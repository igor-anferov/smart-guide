const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

router.get('/:group_id/exams', async (req, res, next) => {
  try {
    const group_id = parseInt(req.params.group_id)
    const results = await pool.query(
      'SELECT exam_id, title, teacher FROM Exams WHERE group_id = $1 AND group_id IN (SELECT group_id FROM GroupMembers WHERE user_id = $2);',
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

module.exports = router