const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const auth = require('./auth')

var router = express.Router()

router.use(morgan('combined'))
router.use(cookieParser())
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(fileUpload({
  createParentPath: true
}));

router.post('/auth', auth.authHandler)
router.post('/register', auth.regHandler)

router.use(/\/.+/, auth.verifyToken)

router.use('/books', require('./books/router.js'))
router.use('/clipboard', require('./clipboard/router.js'))
router.use('/base_elements', require('./base_elements/router.js'))

router.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
})

module.exports = router
