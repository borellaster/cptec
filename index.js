var app = require('express')(),
  countries = require('./server/controllers/countries'),
  states = require('./server/controllers/states'),
  cities = require('./server/controllers/cities'),
  bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*countries api*/
app.get('/rest/countries/:page/:size', countries.findAll);
app.get('/rest/countries/search/:page/:size/:name', countries.search);
app.get('/rest/countries/:id', countries.findById);
app.post('/rest/countries', countries.save);
app.put('/rest/countries/:id', countries.update);
app.delete('/rest/countries/:id', countries.delete);

/*states api*/
app.get('/rest/states/:page/:size', states.findAll);
app.get('/rest/states/search/:page/:size/:name', states.search);
app.get('/rest/states/:id', states.findById);
app.post('/rest/states', states.save);
app.put('/rest/states/:id', states.update);
app.delete('/rest/states/:id', states.delete);

/*cities api*/



//app.get('/rest/countries/raw/json', countries.raw);
//usado para sql nativo...

//set default port
app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
  console.log("CPTEC Node Server started on port", app.get('port'));
});
