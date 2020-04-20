const express = require('express');
const pdfjs = require('pdfjs-dist');

let router = express.Router();

const pool = require('../db/pool')

router.get('/', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT book_id, title FROM Books_PDF WHERE id_user = $1;',
      [req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {pdf, title} = req.body;
    if (!title) {
      title = pdf.originalname;
    }
    try {
      await pdfjs.getDocument({
        data: new Uint8Array(pdf.buffer),
        stopAtErrors: true,
      }).promise
    } catch (e) {
      return next({...e, status: 400})
    }
    const results = await pool.query(
      'INSERT INTO Books_PDF (title, id_user, content) VALUES ($1, $2, $3) RETURNING book_id',
      [title, req.user.id, pdf.buffer]
    )
    res.status(201).json({
      "book_id": results.rows[0].book_id
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:book_id', async (req, res, next) => {
  try {
    const book_id = parseInt(req.params.book_id)
    const results = await pool.query(
      'DELETE FROM Books_PDF WHERE book_id =$1;',
      [book_id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.get('/:book_id/info', async (req, res, next) => {
  try {
    const book_id = parseInt(req.params.book_id)
    const results = await pool.query(
      'SELECT title FROM Books_PDF WHERE book_id =$1;',
      [book_id]
    )
    res.status(200).send(results.rows[0])
  } catch (e) {
    next(e)
  }
})

router.post('/:book_id/info', async (req, res, next) => {
  try {
    const book_id = parseInt(req.params.book_id)
    const new_title = req.body.title
    const results = await pool.query(
      'UPDATE Books_PDF SET title = $1 WHERE book_id =$2;',
      [new_title, book_id]
    )
    res.status(200).send()
  } catch (e) {
    next(e)
  }
})

router.get('/:book_id/content', async (req, res, next) => {
  try {
    const book_id = parseInt(req.params.book_id)
    const results = await pool.query(
      'SELECT content FROM Books_PDF WHERE book_id =$1;',
      [book_id]
    )
    res.contentType("application/pdf");
    res.status(200).send(results.rows[0].content);
  } catch (e) {
    next(e)
  }
})

module.exports = router
