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

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'You have to be logged in to access the page.')
  res.redirect('/')
}

/*countries api*/
app.get('/api/v1/countries/:page/:size', isAuthenticated, countries.findAll);
app.get('/api/v1/countries/search/:page/:size/:name', isAuthenticated, countries.search);
app.get('/api/v1/countries/:id', isAuthenticated, countries.findById);
app.post('/api/v1/countries', isAuthenticated, countries.save);
app.put('/api/v1/countries/:id', isAuthenticated, countries.update);
app.delete('/api/v1/countries/:id', isAuthenticated, countries.delete);

/*states api*/
app.get('/api/v1/states/:page/:size', isAuthenticated, states.findAll);
app.get('/api/v1/states/search/:page/:size/:name', isAuthenticated, states.search);
app.get('/api/v1/states/:id', isAuthenticated, states.findById);
app.post('/api/v1/states', isAuthenticated, states.save);
app.put('/api/v1/states/:id', isAuthenticated, states.update);
app.delete('/api/v1/states/:id', isAuthenticated, states.delete);

/*cities api*/
app.get('/api/v1/cities/:page/:size', isAuthenticated, cities.findAll);
app.get('/api/v1/cities/search/:page/:size/:name', isAuthenticated, cities.search);
app.get('/api/v1/cities/:id', isAuthenticated, cities.findById);
app.post('/api/v1/cities', isAuthenticated, cities.save);
app.put('/api/v1/cities/:id', isAuthenticated, cities.update);
app.delete('/api/v1/cities/:id', isAuthenticated, cities.delete);
//app.get('/api/v1/cities/borella/teste/json2csv', cities.testeJson2Csv);

/*variables api*/
app.get('/api/v1/variables/:page/:size', isAuthenticated, variables.findAll);
app.get('/api/v1/variables/search/:page/:size/:name', isAuthenticated, variables.search);
app.get('/api/v1/variables/:id', isAuthenticated, variables.findById);
app.post('/api/v1/variables', isAuthenticated, variables.save);
app.put('/api/v1/variables/:id', isAuthenticated, variables.update);
app.delete('/api/v1/variables/:id', isAuthenticated, variables.delete);

/*users api*/
app.get('/api/v1/users/:page/:size', isAuthenticated, users.findAll);
app.get('/api/v1/users/search/:page/:size/:name', isAuthenticated, users.search);
app.get('/api/v1/users/:id', isAuthenticated, users.findById);
app.post('/api/v1/users', isAuthenticated, users.save);
app.put('/api/v1/users/:id', isAuthenticated, users.update);
app.delete('/api/v1/users/:id', isAuthenticated, users.delete);

/*types api*/
app.get('/api/v1/types/:page/:size', isAuthenticated, types.findAll);
app.get('/api/v1/types/search/:page/:size/:name', isAuthenticated, types.search);
app.get('/api/v1/types/:id', isAuthenticated, types.findById);
app.post('/api/v1/types', isAuthenticated, types.save);
app.put('/api/v1/types/:id', isAuthenticated, types.update);
app.delete('/api/v1/types/:id', isAuthenticated, types.delete);

/*requests api*/
app.get('/api/v1/requests/:page/:size', isAuthenticated, requests.findAll);
app.get('/api/v1/requests/search/:page/:size/:name', isAuthenticated, requests.search);
app.get('/api/v1/requests/:id', isAuthenticated, requests.findById);
app.post('/api/v1/requests', requests.save); //essa fica aberta pq o cara vai poder gravar 
app.put('/api/v1/requests/:id', isAuthenticated, requests.update);
app.delete('/api/v1/requests/:id', isAuthenticated, requests.delete);

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
