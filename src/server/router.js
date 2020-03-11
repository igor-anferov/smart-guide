var express = require('express')
var router = express.Router()

router.use('/books', require('./books/router.js'))
//router.use('/clipboard', require('./clipboard/router.js'))
//router.use('/base_elements', require('./base_elements/router.js'))

module.exports = router