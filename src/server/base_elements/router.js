var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
//var multiparty = require('multiparty');

var fs = require('fs')

const pool = require('../db/pool')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(fileUpload({
  createParentPath: true
}));


router.get('/:id_element/info', (request, response) => {
  pool.query('SELECT title_element, type_element, key_element, sourse, id_author, date_added FROM Elements WHERE id_element = $1;',
   [id_element], (error, results) => {
    if (error) {
      response.status(404)
    }
    response.status(200).send(results.rows[0])
  })
})

router.get('/:id_element/content', (request, response) => {
  pool.query('SELECT body_element FROM Elements WHERE id_element = $1;', [id_element], (error, results) => {
    if (error) {
      response.status(404)
    }
    response.status(200).send(results.rows[0])
  })
})

/*
router.post('./:id_element', (request, response) => {
	pool.query('UPDATE Elements SET field = new_field', [], (error,results) => {
		if (error) {
      response.status(404)
    }
    response.status(200).send(Element сhanged)
	})
})*/

module.exports = router
