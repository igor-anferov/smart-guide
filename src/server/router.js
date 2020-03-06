var express = require('express')
var router = express.Router()

router.use('/books', require('./books/router'))

module.exports = router
