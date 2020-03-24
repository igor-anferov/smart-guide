const express = require('express');
const fs = require('fs')
//const multiparty = require('multiparty');

var router = express.Router();

const pool = require('../db/pool')

router.get('/base_elements', async (req, res, next) => {
  var flag = true;
  try {
    const results = await pool.query(
    'SELECT id_element as base_element_id, title, source, type FROM Elements WHERE id_author = $1 and clipboard = $2;',
    [req.user.id, flag]
    )
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

router.delete('/base_elements/:base_element_id', (req, res, next) => {
  const id_element = parseInt(req.params.base_element_id)
  pool.query('DELETE FROM Elements WHERE id_element =$1;', [id_element], (error, results) => {
    if (error) {
      res.status(404).send('Базовый элемент не найден')
    }
    res.status(200).send('Базовый элемент успешно удалён')
  })
})

router.post('/base_elements', (req, res, next) => {
  var title = req.body.title
  var source = req.body.source
  var image = req.files.image
  var latex = req.files.latex
  var type
  var body
  //typeof latex !== 'undefined'
  if (latex) {
    //console.log('latex')
    type = 'latex'
    body = Buffer.from(latex)
  }
  if (image) {
    //console.log('image')
    type = 'image' 
    body = Buffer.from(image)
    //body = Buffer.from(image.buffer)
    //body = new Buffer(image.buffer.toString(), 'utf-8');
  }
  pool.query('INSERT INTO Elements (title, id_author, body, source, type) VALUES ($1, $2, $3, $4, $5);',
    [title, req.user.id, body.toString(), source, type], (error, results) => {
    if (error) {
      res.status(500).send('Ошибка сервера')
    }
    return res.status(201).json({
      "book_id": results.insertId
    })
  })
})

module.exports = router