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
models = require('./server/controllers/models'),
couples = require('./server/controllers/couples'),
scenarios = require('./server/controllers/scenarios'),
resolutions = require('./server/controllers/resolutions'),
ensembles = require('./server/controllers/ensembles'),
intervals = require('./server/controllers/intervals'),
requests = require('./server/controllers/requests'),
configurations = require('./server/controllers/configurations'),
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
app.get('/api/v1/countries/:page/:size', countries.findAll);
app.get('/api/v1/countries/search/:page/:size/:name', app.auth.authenticate(), countries.search);
app.get('/api/v1/countries/:id', countries.findById);
app.post('/api/v1/countries', countries.save);
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

/*models api*/
app.get('/api/v1/models/:page/:size', app.auth.authenticate(), models.findAll);
app.get('/api/v1/models/search/:page/:size/:name', app.auth.authenticate(), models.search);
app.get('/api/v1/models/:id', app.auth.authenticate(), models.findById);
app.post('/api/v1/models', app.auth.authenticate(), models.save);
app.put('/api/v1/models/:id', app.auth.authenticate(), models.update);
app.delete('/api/v1/models/:id', app.auth.authenticate(), models.delete);

/*couples api*/
app.get('/api/v1/couples/:page/:size', app.auth.authenticate(), couples.findAll);
app.get('/api/v1/couples/search/:page/:size/:name', app.auth.authenticate(), couples.search);
app.get('/api/v1/couples/:id', app.auth.authenticate(), couples.findById);
app.post('/api/v1/couples', app.auth.authenticate(), couples.save);
app.put('/api/v1/couples/:id', app.auth.authenticate(), couples.update);
app.delete('/api/v1/couples/:id', app.auth.authenticate(), couples.delete);

/*scenarios api*/
app.get('/api/v1/scenarios/:page/:size', app.auth.authenticate(), scenarios.findAll);
app.get('/api/v1/scenarios/search/:page/:size/:name', app.auth.authenticate(), scenarios.search);
app.get('/api/v1/scenarios/:id', app.auth.authenticate(), scenarios.findById);
app.post('/api/v1/scenarios', app.auth.authenticate(), scenarios.save);
app.put('/api/v1/scenarios/:id', app.auth.authenticate(), scenarios.update);
app.delete('/api/v1/scenarios/:id', app.auth.authenticate(), scenarios.delete);

/*resolutions api*/
app.get('/api/v1/resolutions/:page/:size', app.auth.authenticate(), resolutions.findAll);
app.get('/api/v1/resolutions/search/:page/:size/:name', app.auth.authenticate(), resolutions.search);
app.get('/api/v1/resolutions/:id', app.auth.authenticate(), resolutions.findById);
app.post('/api/v1/resolutions', app.auth.authenticate(), resolutions.save);
app.put('/api/v1/resolutions/:id', app.auth.authenticate(), resolutions.update);
app.delete('/api/v1/resolutions/:id', app.auth.authenticate(), resolutions.delete);

/*ensembles api*/
app.get('/api/v1/ensembles/:page/:size', app.auth.authenticate(), ensembles.findAll);
app.get('/api/v1/ensembles/search/:page/:size/:name', app.auth.authenticate(), ensembles.search);
app.get('/api/v1/ensembles/:id', app.auth.authenticate(), ensembles.findById);
app.post('/api/v1/ensembles', app.auth.authenticate(), ensembles.save);
app.put('/api/v1/ensembles/:id', app.auth.authenticate(), ensembles.update);
app.delete('/api/v1/ensembles/:id', app.auth.authenticate(), ensembles.delete);

/*intervals api*/
app.get('/api/v1/intervals/:page/:size', app.auth.authenticate(), intervals.findAll);
app.get('/api/v1/intervals/search/:page/:size/:name', app.auth.authenticate(), intervals.search);
app.get('/api/v1/intervals/:id', app.auth.authenticate(), intervals.findById);
app.post('/api/v1/intervals', app.auth.authenticate(), intervals.save);
app.put('/api/v1/intervals/:id', app.auth.authenticate(), intervals.update);
app.delete('/api/v1/intervals/:id', app.auth.authenticate(), intervals.delete);

/*configurations api*/
app.get('/api/v1/configurations/:page/:size', configurations.findAll);
app.get('/api/v1/configurations/search/:page/:size/:name', app.auth.authenticate(), configurations.search);
app.get('/api/v1/configurations/:id', app.auth.authenticate(), configurations.findById);
app.post('/api/v1/configurations', app.auth.authenticate(), configurations.save);
app.put('/api/v1/configurations/:id', app.auth.authenticate(), configurations.update);
app.delete('/api/v1/configurations/:id', app.auth.authenticate(), configurations.delete);

/*PUBLIC ROUTES*/
/*login*/
app.post('/api/v1/autentication', autentication.login); 
/*Native Queries*/
app.get('/api/v1/public/countries', countries.combo);
app.get('/api/v1/public/cities/:name', cities.combo);
app.get('/api/v1/public/states', states.combo);
app.get('/api/v1/public/variables', variables.combo);
app.get('/api/v1/public/requests/:id', requests.findByIdDownload);

/*models public*/
app.get('/api/v1/public/models', models.combo);
/*couple public*/
app.get('/api/v1/public/couples', couples.combo);
/*scenarios public*/
app.get('/api/v1/public/scenarios', scenarios.combo);
/*resolutions public*/
app.get('/api/v1/public/resolutions', resolutions.combo);
/*ensembles public*/
app.get('/api/v1/public/ensembles', ensembles.combo);
/*intervals public*/
app.get('/api/v1/public/intervals', intervals.combo);
/*types public*/
app.get('/api/v1/public/types', types.combo);
/*process public*/
app.get('/api/v1/public/requests/:id', requests.process);


app.get('/api/v1/public/json/:longitude/:latitude/:variables/:startdate/:enddate/', public.findByCoordinates);
app.get('/api/v1/public/json/:longitude/:latitude/:variables/:startdate/:enddate/:page/:size', public.findByCoordinatesPag);

//ver aqui quando não for paginado, teria que ter um minimo de periodo para retornar os dados
//mais que X anos, temos que bloquear e forçar para que façam uma requisição

//set default port
app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
  console.log("CPTEC Node Server started on port", app.get('port'));
});
