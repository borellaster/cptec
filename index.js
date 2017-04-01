var app = require('express')(),
express = require("express"),
session = require('express-session'),
cookieParser = require('cookie-parser'),
flash = require('connect-flash'),
http = require('http'),
path = require('path'),
bodyParser = require('body-parser')

/*API*/
countries = require('./server/controllers/countries'),
states = require('./server/controllers/states'),
cities = require('./server/controllers/cities'),
variables = require('./server/controllers/variables'),
types = require('./server/controllers/types'),
users = require('./server/controllers/users'),
requests = require('./server/controllers/requests'),
public = require('./server/controllers/public'),
autentication = require('./server/controllers/authorization'),
/*Authorization*/
authorization = require('./auth');
/*Request Timer*/
require('./server/controllers/requestProcessing');

  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

/*Authorization config*/
const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

app.use(flash());

/*countries api*/
app.get('/api/v1/countries/:page/:size', app.auth.authenticate(), countries.findAll);
app.get('/api/v1/countries/search/:page/:size/:name', app.auth.authenticate(), countries.search);
app.get('/api/v1/countries/:id', app.auth.authenticate(), countries.findById);
app.post('/api/v1/countries', app.auth.authenticate(), countries.save);
app.put('/api/v1/countries/:id', app.auth.authenticate(), countries.update);
app.delete('/api/v1/countries/:id', app.auth.authenticate(), countries.delete);

/*states api*/
app.get('/api/v1/states/:page/:size', app.auth.authenticate(), states.findAll);
app.get('/api/v1/states/search/:page/:size/:name', app.auth.authenticate(), states.search);
app.get('/api/v1/states/:id', app.auth.authenticate(), states.findById);
app.post('/api/v1/states', app.auth.authenticate(), states.save);
app.put('/api/v1/states/:id', app.auth.authenticate(), states.update);
app.delete('/api/v1/states/:id', app.auth.authenticate(), states.delete);

/*cities api*/
app.get('/api/v1/cities/:page/:size', app.auth.authenticate(), cities.findAll);
app.get('/api/v1/cities/search/:page/:size/:name', app.auth.authenticate(), cities.search);
app.get('/api/v1/cities/:id', app.auth.authenticate(), cities.findById);
app.post('/api/v1/cities', app.auth.authenticate(), cities.save);
app.put('/api/v1/cities/:id', app.auth.authenticate(), cities.update);
app.delete('/api/v1/cities/:id', app.auth.authenticate(), cities.delete);

/*variables api*/
app.get('/api/v1/variables/:page/:size', app.auth.authenticate(), variables.findAll);
app.get('/api/v1/variables/search/:page/:size/:name', app.auth.authenticate(), variables.search);
app.get('/api/v1/variables/:id', app.auth.authenticate(), variables.findById);
app.post('/api/v1/variables', app.auth.authenticate(), variables.save);
app.put('/api/v1/variables/:id', app.auth.authenticate(), variables.update);
app.delete('/api/v1/variables/:id', app.auth.authenticate(), variables.delete);

/*users api*/
app.get('/api/v1/users/:page/:size', app.auth.authenticate(), users.findAll);
app.get('/api/v1/users/search/:page/:size/:name', app.auth.authenticate(), users.search);
app.get('/api/v1/users/:id', app.auth.authenticate(), users.findById);
app.post('/api/v1/users', users.save);
app.put('/api/v1/users/:id', app.auth.authenticate(), users.update);
app.delete('/api/v1/users/:id', app.auth.authenticate(), users.delete);

/*types api*/
app.get('/api/v1/types/:page/:size', app.auth.authenticate(), types.findAll);
app.get('/api/v1/types/search/:page/:size/:name', app.auth.authenticate(), types.search);
app.get('/api/v1/types/:id', app.auth.authenticate(), types.findById);
app.post('/api/v1/types', app.auth.authenticate(), types.save);
app.put('/api/v1/types/:id', app.auth.authenticate(), types.update);
app.delete('/api/v1/types/:id', app.auth.authenticate(), types.delete);

/*requests api*/
app.get('/api/v1/requests/:page/:size', app.auth.authenticate(), requests.findAll);
app.get('/api/v1/requests/search/:page/:size/:name', app.auth.authenticate(), requests.search);
app.get('/api/v1/requests/:id', app.auth.authenticate(), requests.findById);
app.post('/api/v1/requests', requests.save); //essa fica aberta pq o cara vai poder gravar 
app.put('/api/v1/requests/:id', app.auth.authenticate(), requests.update);
app.delete('/api/v1/requests/:id', app.auth.authenticate(), requests.delete);

/*login*/
app.post('/api/v1/autentication', autentication.login); 

/*Native Queries*/
app.get('/api/v1/native/countries/wrapper', countries.combo);
app.get('/api/v1/native/cities/wrapper/:name', cities.combo);
app.get('/api/v1/native/states/wrapper', states.combo);
app.get('/api/v1/native/variables/wrapper', variables.combo);


app.get('/api/v1/public/json/:longitude/:latitude/:variables/:startdate/:enddate/', public.findByCoordinates);
app.get('/api/v1/public/json/:longitude/:latitude/:variables/:startdate/:enddate/:page/:size', public.findByCoordinatesPag);

//ver aqui quando não for paginado, teria que ter um minimo de periodo para retornar os dados
//mais que X anos, temos que bloquear e forçar para que façam uma requisição

//set default port
app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
  console.log("CPTEC Node Server started on port", app.get('port'));
});
