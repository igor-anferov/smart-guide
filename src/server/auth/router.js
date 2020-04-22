const express = require('express');

const crypto = require('crypto');
const pool = require('../db/pool');
const { updateTokenCookie } = require('./utils');


var router = express.Router();


router.post('/login', async (req, res, next) => {
  const login = req.body.login
  const hs256 = req.body.hs256
  if (!login || !hs256) {
    return res.status(400).end()
  }
  try {
    var results = await pool.query(
      'SELECT id_user, hs256_sha256 from Users WHERE login = $1;',
      [ login ]
    )
    if (results.rows.length === 0) {
      return res.status(400).json({
        reason: 'USER_NOT_FOUND'
      })
    }
    const hash = crypto.createHash('sha256')
    hash.update(hs256)
    const hs256_sha256 = hash.digest('hex')
    if (hs256_sha256 !== results.rows[0].hs256_sha256) {
      return res.status(400).json({
        reason: 'WRONG_HS256'
      })
    }
    updateTokenCookie(res, {
      user: {
        id: results.rows[0].id_user
      }
    }).status(200).end()
  } catch (e) {
    next(e)
  }
})

router.post('/register', async (req, res, next) => {
  const login = req.body.login
  const hs256 = req.body.hs256
  const email = req.body.email
  if (!login || !hs256 || !email) {
    return res.status(400).end()
  }
  try {
    let results = await pool.query(
      'SELECT COUNT(1) from Users WHERE login = $1;',
      [ login ]
    )
    if (results.rows[0].count > 0) {
      return res.status(400).json({
        reason: 'LOGIN_ALREADY_USED'
      })
    }
    results = await pool.query(
      'SELECT COUNT(1) from Users WHERE email = $1;',
      [ email ]
    )
    if (results.rows[0].count > 0) {
      return res.status(400).json({
        reason: 'EMAIL_ALREADY_USED'
      })
    }
    const hash = crypto.createHash('sha256')
    hash.update(hs256)
    const hs256_sha256 = hash.digest('hex')
    results = await pool.query(
      'INSERT INTO Users (login, email, hs256_sha256) VALUES($1, $2, $3) RETURNING id_user',
      [ login, email, hs256_sha256 ]
    )
    updateTokenCookie(res, {
      user: {
        id: results.rows[0].id_user
      }
    }).status(200).end()
  } catch (e) {
    next(e)
  }
})

module.exports = router
