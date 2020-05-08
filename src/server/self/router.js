const assert = require('assert').strict;
const express = require('express');

const crypto = require('crypto');

let router = express.Router();

const pool = require('../db/pool')

router.get('/', async (req, res, next) => {
  console.log(req.user.id)
  try {
    const results = await pool.query(
      "SELECT user_id, email, login, name, university, faculty FROM Users WHERE user_id = $1",
      [req.user.id]
    )
    res.status(200).send(results.rows[0])
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  var args = req.body
  var check = false
  try {
    if (args.login) {
      var results = await pool.query(
        'SELECT COUNT(1) from Users WHERE login = $1;',
        [args.login]
      )
      if (results.rows[0].count > 0) {
        return res.status(400).json({
          reason: 'LOGIN_ALREADY_USED'
        })
      }
    }
    if (args.email) {
      results = await pool.query(
        'SELECT COUNT(1) from Users WHERE email = $1;',
        [args.email]
      )
      if (results.rows[0].count > 0) {
        return res.status(400).json({
          reason: 'EMAIL_ALREADY_USED'
        })
      }
    }
    if (args.current_hs256) {
      results = await pool.query(
        'SELECT hs256_sha256 FROM Users WHERE user_id = $1',
        [req.user.id]
      )
      const hash = crypto.createHash('sha256')
      hash.update(args.current_hs256)
      const hs256_sha256 = hash.digest('hex')
      if (hs256_sha256 !== results.rows[0].hs256_sha256) {
        return res.status(400).json({
          reason: 'WRONG_HS256'
        })
      }
      check = true
      delete args.current_hs256
    }
    if (args) {
      if (args.new_hs256 && check) {
        const hash = crypto.createHash('sha256')
        hash.update(args.new_hs256)
        args.hs256_sha256 = hash.digest('hex')
        delete args.new_hs256
      }
      await pool.query(
        `UPDATE Users SET ${
          Object.keys(args)
            .map((k, i) => k + ` = $${i + 1}`)
            .join()
        } WHERE user_id = $${Object.entries(args).length + 1}`,
        [...Object.values(args), req.user.id]
      )
    }
    res.status(200).send()
  } catch (e) {
    next(e)
  }    
})

module.exports = router