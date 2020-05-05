const assert = require('assert').strict;
const express = require('express');

let router = express.Router();

const pool = require('../db/pool')

router.post('/search', async (req, res, next) => {
  try {
  	var email = "%" + req.body.email + "%"
  	var login = "%" + req.body.login + "%"
    const results = await pool.query(
      "SELECT user_id, email, login, name, university, faculty FROM Users WHERE login LIKE $1 OR email LIKE $2",
      [login, email]
    )
    /*var email = req.body.email + ":*"
  	var login = req.body.login + ":*"
    const results = await pool.query(
      "SELECT user_id, email, login, name, university, faculty FROM Users\
       WHERE to_tsvector(login) @@ to_tsquery($1) OR to_tsvector(email) @@ to_tsquery($2)",
      [login, email]
    )*/
    res.status(200).send(results.rows)
  } catch (e) {
    next(e)
  }
})

module.exports = router