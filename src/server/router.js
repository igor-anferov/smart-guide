const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const { verifyToken, refreshToken } = require('./auth/utils')
const { ClientError } = require('./utils')

async function setupApi(router) {
  router.use(morgan('combined'))

  router.use(cookieParser())
  router.use(bodyParser.urlencoded({ extended: true }));

  await new OpenApiValidator({
    apiSpec: require('../docs/openapi/api'),
    validateResponses: true,
    coerceTypes: 'array',
    validateSecurity: {
      handlers: {
        'Аутентификационный токен': verifyToken
      }
    },
  }).install(router)

  router.use((req, res, next) => {
    for (let [k, v] of Object.entries(req.body))
      if (v instanceof Array && v.length === 1)
        req.body[k] = v[0].split(',').filter(s=>s)
    if (req.files) {
      for (let file of req.files) {
        let {fieldname, ...content} = file;
        req.body[fieldname] = content;
      }
    }
    next()
  })

  router.use(refreshToken)

  router.use('/auth', require('./auth/router'))
  router.use('/books', require('./books/router'))
  router.use('/clipboard', require('./clipboard/router'))
  router.use('/base_elements', require('./base_elements/router'))
  router.use('/materials', require('./materials/router'))
  router.use('/exams', require('./exams/router'))
  router.use('/groups', require('./groups/router'))
  router.use('/users', require('./users/router'))
  router.use('/self', require('./self/router'))

  router.use((err, req, res, next) => {
    const status = err.status || (err instanceof ClientError && 400) || 500;
    switch (Math.floor(status / 100)) {
      case 1:
      case 2:
      case 3:
        console.log(err);
        break;
      case 4:
        console.warn(err);
        break;
      default:
        console.error(err);
        break;
    }
    res.status(status).json({
      message: err.message,
      errors: err.errors,
    });
  })
}

module.exports = setupApi
