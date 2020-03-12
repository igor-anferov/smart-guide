var express = require('express')
var morgan = require('morgan')

var router = express.Router()

router.use(morgan('combined'))

router.use('/books', require('./books/router.js'))
router.use('/clipboard', require('./clipboard/router.js'))
router.use('/base_elements', require('./base_elements/router.js'))

router.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
})

module.exports = router
