var app = require('express')(),
  countries = require('./server/controllers/countries'),
  states = require('./server/controllers/states'),
  cities = require('./server/controllers/cities'),
  bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/rest/countries', countries.index);
app.get('/rest/countries/:id', countries.show);
app.post('/rest/countries', countries.create);
app.put('/rest/countries/:id', countries.update);
app.delete('/rest/countries/:id', countries.delete);


app.get('/rest/states', states.index);
app.get('/rest/states/:id', states.show);
app.post('/rest/states', states.create);
app.put('/rest/states/:id', states.update);
app.delete('/rest/states/:id', states.delete);

app.get('/rest/cities', cities.index);
app.get('/rest/cities/:id', cities.show);
app.post('/rest/cities', cities.create);
app.put('/rest/cities/:id', cities.update);
app.delete('/rest/cities/:id', cities.delete);

//app.get('/rest/countries/raw/json', countries.raw);
//usado para sql nativo...

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log("CPTEC Node Server started on port", app.get('port'));
});
