var express = require('express')
var router = express.Router()

router.use('/books', require('./books/router.js'))
//router.use('/clipboard', require('./clipboard/router.js'))
//router.use('/base_element' require('./base_element/router.js'))
module.exports = router
