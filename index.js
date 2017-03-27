var app = require('express')(),
	express = require("express"),
 	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	http = require('http'),
	path = require('path'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
  setupHandlebars  = require('./server/setupHandlebars.js')(app),
  setupPassport = require('./server/setupPassport'),  

	/*API*/
  countries = require('./server/controllers/countries'),
  states = require('./server/controllers/states'),
  cities = require('./server/controllers/cities'),
  variables = require('./server/controllers/variables'),
  types = require('./server/controllers/types'),
  users = require('./server/controllers/users'),
   requests = require('./server/controllers/requests'),
  public = require('./server/controllers/public');
  /*Request Timer*/
  require('./server/controllers/requestProcessing');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))
app.use(cookieParser());
app.use(express.static('public'));


app.use(flash());
setupPassport(app);
//app.use(passport.initialize());
//app.use(passport.session());

/*countries api*/
app.get('/api/v1/countries/:page/:size', countries.findAll);
app.get('/api/v1/countries/search/:page/:size/:name', countries.search);
app.get('/api/v1/countries/:id', countries.findById);
app.post('/api/v1/countries', countries.save);
app.put('/api/v1/countries/:id', countries.update);
app.delete('/api/v1/countries/:id', countries.delete);

/*states api*/
app.get('/api/v1/states/:page/:size', states.findAll);
app.get('/api/v1/states/search/:page/:size/:name', states.search);
app.get('/api/v1/states/:id', states.findById);
app.post('/api/v1/states', states.save);
app.put('/api/v1/states/:id', states.update);
app.delete('/api/v1/states/:id', states.delete);

/*cities api*/
app.get('/api/v1/cities/:page/:size', cities.findAll);
app.get('/api/v1/cities/search/:page/:size/:name', cities.search);
app.get('/api/v1/cities/:id', cities.findById);
app.post('/api/v1/cities', cities.save);
app.put('/api/v1/cities/:id', cities.update);
app.delete('/api/v1/cities/:id', cities.delete);
//app.get('/api/v1/cities/borella/teste/json2csv', cities.testeJson2Csv);

/*variables api*/
app.get('/api/v1/variables/:page/:size', variables.findAll);
app.get('/api/v1/variables/search/:page/:size/:name', variables.search);
app.get('/api/v1/variables/:id', variables.findById);
app.post('/api/v1/variables', variables.save);
app.put('/api/v1/variables/:id', variables.update);
app.delete('/api/v1/variables/:id', variables.delete);

/*users api*/
app.get('/api/v1/users/:page/:size', users.findAll);
app.get('/api/v1/users/search/:page/:size/:name', users.search);
app.get('/api/v1/users/:id', users.findById);
app.post('/api/v1/users', users.save);
app.put('/api/v1/users/:id', users.update);
app.delete('/api/v1/users/:id', users.delete);

/*types api*/
app.get('/api/v1/types/:page/:size', types.findAll);
app.get('/api/v1/types/search/:page/:size/:name', types.search);
app.get('/api/v1/types/:id', types.findById);
app.post('/api/v1/types', types.save);
app.put('/api/v1/types/:id', types.update);
app.delete('/api/v1/types/:id', types.delete);

/*types api*/
app.get('/api/v1/requests/:page/:size', requests.findAll);
app.get('/api/v1/requests/search/:page/:size/:name', requests.search);
app.get('/api/v1/requests/:id', requests.findById);
app.post('/api/v1/requests', requests.save);
app.put('/api/v1/requests/:id', requests.update);
app.delete('/api/v1/requests/:id', requests.delete);

/*Native Queries*/
app.get('/api/v1/native/countries/wrapper', countries.combo);
app.get('/api/v1/native/cities/wrapper/:name', cities.combo);
app.get('/api/v1/native/states/wrapper', states.combo);
app.get('/api/v1/native/variables/wrapper', variables.combo);


app.get('/api/v1/public/json/:longitude/:latitude/:variables/:startdate/:enddate/', public.findByCoordinates);
app.get('/api/v1/public/json/:longitude/:latitude/:variables/:startdate/:enddate/:page/:size', public.findByCoordinatesPag);

//set default port
app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
  console.log("CPTEC Node Server started on port", app.get('port'));
});
