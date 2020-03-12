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

router.get('/base_elements', (request, response) => {
  //const id_user = parseInt(request.params.id_user)
  var id_user = 1;
  var flag = true;
  pool.query('SELECT * FROM Elements WHERE id_user = $1 and clipboard = $2;', [id_user, flag], (error, results) => {
    if (error) {
      response.status(404)
    }
    response.status(200).send(results.rows)
  })
})

router.delete('/base_elements/:id_element', (request, response) => {
  const id_element = parseInt(request.params.id_element)
  pool.query('DELETE FROM Elements WHERE id_element =$1;', [id_element], (error, results) => {
    if (error) {
      response.status(404).send('Element is not found')
    }
    response.status(200).send('OK, element deleted')
  })
})

/*router.post('/base_elements', (request, response) => {
	var {title, sourse, image}  = request.body
  pool.query('INSERT INTO Elements (title_element, id_user, body_element, sourse) VALUES ($1, $2, $3, $4);', [title, id_user, image, sourse], (error, results) => {
    if (error) {
      response.status(500).send('error server')
    }
    response.status(201).send(results.insertId)
  })
})*/

module.exports = router
