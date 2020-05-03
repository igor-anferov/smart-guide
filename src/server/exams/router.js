const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

router.get('/', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT exam_id, title, teacher FROM Exams WHERE author_id = $1 AND group_id IS NULL;',
      [req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
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

module.exports = router
