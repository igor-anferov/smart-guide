const jwt = require('jsonwebtoken')
const assert = require('assert').strict

const JWT_SECRET = process.env.JWT_SECRET;
assert(JWT_SECRET && JWT_SECRET.length > 0, "Please specify JWT_SECRET in environment")
const expiration = 60 * 60 * 24 * 7

function makeToken(props) {
  return jwt.sign(props, JWT_SECRET, {
    expiresIn: expiration,
  })
}

function updateTokenCookie(res, props) {
  return res.cookie('token', makeToken(props), {
    expires: new Date(Date.now() + expiration),
    secure: process.env.HTTPS === 'true',
    httpOnly: true,
  })
}

async function verifyToken(req) {
  const decrypt = await jwt.verify(req.cookies.token, JWT_SECRET);
  req.user = decrypt.user;
  return true
}

function refreshToken(req, res, next) {
  if (req.user) {
    updateTokenCookie(res, {
      user: req.user
    })
  }
  next()
}

module.exports = {
  updateTokenCookie,
  verifyToken,
  refreshToken,
}
