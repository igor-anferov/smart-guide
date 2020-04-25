const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

router.get('/', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT exam_id, title, teacher FROM Exams WHERE author_id = $1 OR group_id IN (SELECT group_id FROM GroupMembers WHERE user_id = $1);',
      [req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.get('/:exam_id/info', async (req, res, next) => {
  try {
    const exam_id = parseInt(req.params.exam_id)
    const results = await pool.query(
      'SELECT title, teacher FROM Exams WHERE exam_id = $1;',
      [exam_id]
    )
    res.status(200).send(results.rows[0])
  } catch (e) {
    next(e)
  }
})

router.get('/:exam_id/content', async (req, res, next) => {
  try {
    const exam_id = parseInt(req.params.exam_id)
    const results = await pool.query(
      'SELECT q.question_id, text FROM Questions as q INNER JOIN ExamQuestions as a ON a.question_id = q.question_id WHERE exam_id = $1;',
      [exam_id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

module.exports = router
