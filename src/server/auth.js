const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const assert = require('assert').strict

const pool = require('./db/pool');
const JWT_SECRET = process.env.JWT_SECRET;
assert(JWT_SECRET.length > 0, "Please specify JWT_SECRET in environment")
const expiration = 60 * 60 * 24 * 7

function makeToken(props) {
  return jwt.sign(props, JWT_SECRET, {
    expiresIn: expiration,
  })
}

function updateCookie(res, props) {
  return res.cookie('token', makeToken(props), {
    expires: new Date(Date.now() + expiration),
    secure: true,
    httpOnly: true,
  })
}

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  if (!token) {
    return res.status(401).end()
  }
  try {
    const decrypt = await jwt.verify(token, JWT_SECRET);
    req.user = decrypt.user;
    updateCookie(res, {
      user: decrypt.user
    })
  } catch (err) {
    console.warn(err)
    return res.clearCookie('token').status(401).end();
  }
  next();
}

const authHandler = async (req, res, next) => {
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
    updateCookie(res, {
      user: {
        id: results.rows[0].id_user
      }
    }).status(200).end()
  } catch (e) {
    next(e)
  }
}

const regHandler = async (req, res, next) => {
  const login = req.body.login
  const hs256 = req.body.hs256
  const email = req.body.email
  if (!login || !hs256 || !email) {
    return res.status(400).end()
  }
  try {
    var results = await pool.query(
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
    await pool.query(
      'INSERT INTO Users (login, email, hs256_sha256) VALUES($1, $2, $3);',
      [ login, email, hs256_sha256 ]
    )
    results = await pool.query(
      'SELECT id_user from Users WHERE login = $1;',
      [ login ]
    )
    updateCookie(res, {
      user: {
        id: results.rows[0].id_user
      }
    }).status(200).end()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  verifyToken,
  authHandler,
  regHandler,
}
