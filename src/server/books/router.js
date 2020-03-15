const assert = require('assert').strict
const express = require('express');
const fs = require('fs')
//const multiparty = require('multiparty');

var router = express.Router();

const pool = require('../db/pool')
const FILES_DIR = process.env.FILES_DIR
assert(FILES_DIR && FILES_DIR.length > 0, "Please specify FILES_DIR in environment")


router.get('/', async (req, res, next) => {
  try {
    const results = await pool.query(
      'SELECT id_book AS id, title FROM Books_PDF WHERE id_user = $1;',
      [req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.post('/', (req, res, next) => {
  var pdf = req.files.pdf
  var title = pdf.name
  var pdf_path = String(FILES_DIR + '/' + title)
  pdf.mv(pdf_path);
  pool.query('INSERT INTO Books_PDF (title, id_user, pdf_path) VALUES ($1, $2, $3);', [title, id_user, pdf_path], (error, results) => {
    if (error) {
      res.status(500).send('error server')
    }
    res.status(201).send(results.insertId)
  })
})

router.delete('/:book_id', (req, res, next) => {
  const id_book = parseInt(req.params.book_id)
  pool.query('DELETE FROM Books_PDF WHERE id_book =$1;', [id_book], (error, results) => {
    if (error) {
      res.status(404).send('Book is not found')
    }
    res.status(200).send('OK, book deleted')
  })
})

router.get('/:book_id/info', (req, res, next) => {
  var id_book = parseInt(req.params.book_id)
  pool.query('SELECT title FROM Books_PDF WHERE id_book =$1;', [id_book], (error, results) => {
    if (error) {
      res.status(404).send('Book is not found')
    }
    res.status(200).send(results.rows[0])
  })
})

router.post('/:book_id/info', (req, res, next) => {
  var id_book = parseInt(req.params.book_id)
  const { new_title } = req.body
  pool.query('UPDATE Books_PDF SET title = $1 WHERE id_book =$2;', [new_title, id_book], (error, results) => {
    if (error) {
      res.status(404).send('Book not found')
    }
    res.status(200).send('/OK, title changed')
  })
})

router.get('/:book_id/content', (req, res, next) => {
  var id_book = parseInt(req.params.book_id)
  pool.query('SELECT pdf_path FROM Books_PDF WHERE id_book =$1;', [id_book], (error, results) => {
    if (error) {
      res.status(404).send('Book is not found')
    }
    var pdf = String(results.rows[0].pdf_path)
    var data = fs.readFileSync(pdf);
    res.contentType("application/pdf");
    res.send(data);
  })
})

module.exports = router
