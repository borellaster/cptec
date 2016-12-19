var app = require('express')(),
  countries = require('./server/controllers/countries'),
  bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/rest/countries', countries.index);
app.get('/rest/countries/:id', countries.show);
app.post('/rest/countries', countries.create);
app.put('/rest/countries/:id', countries.update);
app.delete('/rest/countries/:id', countries.delete);

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log("CPTEC Node Server started on port", app.get('port'));
});
