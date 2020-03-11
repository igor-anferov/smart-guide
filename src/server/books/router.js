var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var fs = require('fs')

const client = require('../db')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(fileUpload({
  createParentPath: true
}));

router.get('/', (request, response) => {
  //const id_user = parseInt(request.params.id_user)
  var id_user = 1;
  client.query('SELECT id_book, title FROM Books_PDF WHERE id_user = $1;', [id_user], (error, results) => {
    if (error) {
      response.status(404)
    }
    response.status(200).send(results.rows)
  })
})

router.post('/', (request, response) => {
  //const id_user = parseInt(request.params.id_user)
  var id_user = 1;
  var pdf = request.files.pdf
  var title = pdf.name
  var pdf_path = String('./files_users/' + title)
  pdf.mv(pdf_path);
  client.query('INSERT INTO Books_PDF (title, id_user, pdf_path) VALUES ($1, $2, $3);', [title, id_user, pdf_path], (error, results) => {
    if (error) {
      response.status(500).send('error server')
    }
    response.status(201).send(results.insertId)
  })
})

router.delete('/:book_id', (request, response) => {
  const id_book = parseInt(request.params.book_id)
  client.query('DELETE FROM Books_PDF WHERE id_book =$1;', [id_book], (error, results) => {
    if (error) {
      response.status(404).send('Book is not found')
    }
    response.status(200).send('OK, book deleted')
  })
})

router.get('/:book_id/info', (request, response) => {
  var id_book = parseInt(request.params.book_id)
  client.query('SELECT title FROM Books_PDF WHERE id_book =$1;', [id_book], (error, results) => {
    if (error) {
      response.status(404).send('Book is not found')
    }
    response.status(200).send(results.rows[0])
  })
})

router.post('/:book_id/info', (request, response) => {
  var id_book = parseInt(request.params.book_id)
  const { new_title } = request.body
  client.query('UPDATE Books_PDF SET title = $1 WHERE id_book =$2;', [new_title, id_book], (error, results) => {
    if (error) {
      response.status(404).send('Book not found')
    }
    response.status(200).send('/OK, title changed')
  })
})

router.get('/:book_id/content', (request, response) => {
  var id_book = parseInt(request.params.book_id)
  client.query('SELECT pdf_path FROM Books_PDF WHERE id_book =$1;', [id_book], (error, results) => {
    if (error) {
      response.status(404).send('Book is not found')
    }
    var pdf = String(results.rows[0].pdf_path)
    var data = fs.readFileSync(pdf);
    response.contentType("application/pdf");
    response.send(data);
  })
})

module.exports = router
