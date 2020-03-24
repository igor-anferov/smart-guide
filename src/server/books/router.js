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
      'SELECT book_id, title FROM Books_PDF WHERE id_user = $1;',
      [req.user.id]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.post('/', (req, res, next) => {
  var pdf = req.files.pdf
  var title = req.body.title 
  if (!title) {
    title = pdf.name;
  }
  var pdf_path = String(FILES_DIR + '/' + title)
  pdf.mv(pdf_path);
  pool.query('INSERT INTO Books_PDF (title, id_user, pdf_path) VALUES ($1, $2, $3);',
    [title, req.user.id, pdf_path], (error, results) => {
    if (error) {
      res.status(500).send('Ошибка сервера')
    }
    return res.status(201).json({
      "book_id": results.insertId
    })
  })
})

router.delete('/:book_id', (req, res, next) => {
  const book_id = parseInt(req.params.book_id)
  pool.query('DELETE FROM Books_PDF WHERE book_id =$1;',
    [book_id], (error, results) => {
    if (error) {
      res.status(404).send('Книга не найдена')
    }
    res.status(200).send('Книга успешно удалена')
  })
})

router.get('/:book_id/info', (req, res, next) => {
  var book_id = parseInt(req.params.book_id)
  pool.query('SELECT title FROM Books_PDF WHERE book_id =$1;',
    [book_id], (error, results) => {
    if (error) {
      res.status(404).send('Книга не найдена')
    }
    res.status(200).send(results.rows[0])
  })
})

router.post('/:book_id/info', (req, res, next) => {
  var book_id = parseInt(req.params.book_id)
  new_title = req.body.title
  pool.query('UPDATE Books_PDF SET title = $1 WHERE book_id =$2;',
    [new_title, book_id], (error, results) => {
    if (error) {
      res.status(404).send('Книга не найдена')
    }
    res.status(200).send('Информация о книге успешно обновлена')
  })
})

router.get('/:book_id/content', (req, res, next) => {
  var book_id = parseInt(req.params.book_id)
  pool.query('SELECT pdf_path FROM Books_PDF WHERE book_id =$1;',
    [book_id], (error, results) => {
    if (error) {
      res.status(404).send('Книга не найдена')
    }
    var pdf = String(results.rows[0].pdf_path)
    var data = fs.readFileSync(pdf);
    res.contentType("application/pdf");
    res.status(200).send(data);
  })
})

module.exports = router
