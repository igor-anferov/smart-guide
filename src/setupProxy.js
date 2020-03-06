module.exports = function(app) {
  app.use('/api', require('./server/router'))

  app.all(/\/api\/.+/, function(req, res) {
    res.status(404).send('Not found');
  });
};
