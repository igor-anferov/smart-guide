const express = require('express')
const setupApi = require('./server/router')

module.exports = async function(app) {
  let router = express.Router()
  app.use('/api', router)
  app.use(/\/api\/.+/, function(req, res) {
    res.status(404).send('Not found');
  });
  await setupApi(router)
};
