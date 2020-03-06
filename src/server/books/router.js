var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.json([
  {
    id: 1,
    title: "book1",
  },
  {
    id: 2,
    title: "book2",
  },
  ]);
});

module.exports = router
