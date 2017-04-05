var countries = require('./server/controllers/countries')

module.exports = {

  app.get('/api/v1/countries/:page/:size', app.auth.authenticate(), countries.findAll);
  app.get('/api/v1/countries/search/:page/:size/:name', app.auth.authenticate(), countries.search);
  app.get('/api/v1/countries/:id', app.auth.authenticate(), countries.findById);
  app.post('/api/v1/countries', app.auth.authenticate(), countries.save);
  app.put('/api/v1/countries/:id', app.auth.authenticate(), countries.update);
  app.delete('/api/v1/countries/:id', app.auth.authenticate(), countries.delete);

};
