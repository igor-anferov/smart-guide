const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

router.get('/', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT id_list_questions as id_exam, number_version, name_exam, name_teacher FROM List_questions WHERE id_author = $1;',
      [req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.get('/:id_exam/:number_version/info', async (req, res, next) => {
  try {
    const id_exam = parseInt(req.params.id_exam)
    const number_version = parseInt(req.params.number_version)
    const results = await pool.query(
      'SELECT name_exam, name_teacher FROM List_questions WHERE id_list_questions = $1 AND number_version = $2;',
      [id_exam, number_version]
    )
    res.status(200).send(results.rows[0])
  } catch (e) {
    next(e)
  }
})

router.get('/:id_exam/:number_version/content', async (req, res, next) => {
  try {
    const id_exam = parseInt(req.params.id_exam)
    const number_version = parseInt(req.params.number_version)
    const results = await pool.query(
      'SELECT q.id_question, number_version, text_question FROM Questions as q INNER JOIN array_answer as a ON a.id_question = q.id_question AND number_version = number_version2 WHERE id_list_questions = $1 AND number_version = $2;',
      [id_exam, number_version]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

module.exports = router
