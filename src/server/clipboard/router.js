const express = require('express');

var router = express.Router();

const pool = require('../db/pool')

const multer  = require("multer"); 
var storage = multer.memoryStorage()
var uploadmemory = multer({ storage: storage })

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

router.post('/base_elements', uploadmemory.fields([{ name: 'image', maxCount: 1 }, { name: 'latex', maxCount: 1 }]), (req, res, next) => {
  var title = req.body.title
  var source = req.body.source
  var image = req.files['image']
  var latex = req.files['latex']
  var type
  var body
  //typeof latex !== 'undefined'
  if (latex) {
    type = 'latex'
    body = latex[0].buffer 
  }

  if (image) {
    type = 'image'
    body = image[0].buffer 
  }
  pool.query('INSERT INTO Elements (title, id_author, body, source, type, clipboard) VALUES ($1, $2, $3, $4, $5, $6);',
    [title, req.user.id, body, source, type, true], (error, results) => {
    if (error) {
      res.status(500).send('Ошибка сервера')
    }
    return res.status(201).json({
      "base_element_id": results.insertId
    })
  })
})

module.exports = router