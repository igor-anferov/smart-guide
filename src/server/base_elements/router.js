const express = require('express');

var router = express.Router();

const pool = require('../db/pool')

const multer  = require("multer"); 
var storage = multer.memoryStorage()
var uploadmemory = multer({ storage: storage })

router.get('/:base_element_id/info', (req, res, next) => {
  var id_element = parseInt(req.params.base_element_id)
  pool.query('SELECT title, source, type FROM Elements WHERE id_element = $1;',
    [id_element], (error, results) => {
    if (error) {
      res.status(404).send('Базовый элемент не найден')
    }
    res.status(200).send(results.rows[0])
  })
})

router.get('/:base_element_id/content', (req, res, next) => {
  const id_element = parseInt(req.params.base_element_id)
  pool.query('SELECT body, type FROM Elements WHERE id_element = $1;',
    [id_element], (error, results) => {
    if (error) {
      res.status(404).send('Базовый элемент не найден')
    }
    if (results.rows[0].type == 'image') {
        res.contentType("image/*");
    }
    if (results.rows[0].type == 'latex') {
        res.contentType("application/x-latex");
    }
    res.status(200).send(results.rows[0].body)
  })
})

router.post('/:base_element_id', uploadmemory.any(), (req, res, next) => {
    const id_element = parseInt(req.params.base_element_id)
    var title = req.body.title
    var source = req.body.source 
    var argument = [] 
    var text_query = "UPDATE Elements SET "
    var flag = false
    var count = 0
    if (title) {
      count ++
      argument.push(title)
      text_query += (flag ? ", ":"") + " title = $" + count
      flag = true
    }
    if (source) {
      count ++
      argument.push(source)
      text_query += (flag ? ", ":"") + " source = $" + count
      flag = true
    }

    if (req.files) {
      if(req.files[0]) {
        count++
        argument.push(req.files[0].buffer)
        text_query += (flag ? ", ":"") + " body = $" + count
        flag = true
      }
    }
    
    if (!flag) {
      res.status(400).end()
    }

    text_query += " WHERE id_element = " + id_element + "; "
    
    pool.query(text_query, argument, (error,results) => {
      if (error) {
        res.status(404)
      }
      res.status(200).send('Базовый элемент успешно обновлён')
    })
}) 

module.exports = router
