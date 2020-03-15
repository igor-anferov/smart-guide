const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const { verifyToken, refreshToken } = require('./auth/utils')

async function setupApi(path, app) {
  var router = express.Router()

  router.use(morgan('combined'))

  router.use(cookieParser())
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(fileUpload({
    createParentPath: true
  }));

  await new OpenApiValidator({
    apiSpec: require('../docs/openapi/api'),
    validateResponses: true,
    validateSecurity: {
      handlers: {
        'Аутентификационный токен': verifyToken
      }
    },
  }).install(router)

  router.use(refreshToken)

  router.use('/auth', require('./auth/router'))
  router.use('/books', require('./books/router'))
  router.use('/clipboard', require('./clipboard/router'))
  router.use('/base_elements', require('./base_elements/router'))

  router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  })

  app.use(path, router)
}

module.exports = setupApi
