const express = require('express');
const fs = require('fs')
//const multiparty = require('multiparty');

var router = express.Router();

const pool = require('../db/pool')

router.get('/:base_element_id/info', (req, res, next) => {
  var id_element = parseInt(req.params.base_element_id)
  //console.log(id_element);
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

router.post('/:base_element_id', (req, res, next) => {
    const id_element = parseInt(req.params.base_element_id)
    var title = req.body.title
    var source = req.body.source 
    console.log(title)
    console.log(source)
    var text_query = "UPDATE Elements SET "
    var flag = false
    if (title) {
      text_query += (flag ? ", ":"") + "title = '" + title + "' "
      flag = true
    }
    if (source) {
      text_query += (flag ? ", ":"") + "source = '" + source + "' "
      flag = true
    }
    if (req.files) {
      console.log("there")
      var latex = req.files.latex
      if (latex) {
        body = Buffer.from(latex)
        text_query += (flag ? ", ":"") + "body = '" + body.toString() + "' "
        console.log(name)
        flag = true
      }
    }
    if (!flag) {
      res.status(400).end()
    }
    text_query += "WHERE id_element = " + id_element + ";"
    console.log(text_query)
  pool.query(text_query, (error,results) => {
    if (error) {
      res.status(404)
    }
    res.status(200).send('Базовый элемент успешно обновлён')
  })
}) 

module.exports = router
