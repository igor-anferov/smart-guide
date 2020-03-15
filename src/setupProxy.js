var setupApi = require('./server/router')

module.exports = async function(app) {
  await setupApi('/api', app)

  app.all(/\/api\/.+/, function(req, res) {
    res.status(404).send('Not found');
  });
};
