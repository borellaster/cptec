var app = require('express')(),
 	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	http = require('http'),
	path = require('path'),
	passport = require('passport'),
	bodyParser = require('body-parser'),

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

app.use(cookieParser());


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

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
app.get('/rest/cities/:page/:size', cities.findAll);
app.get('/rest/cities/search/:page/:size/:name', cities.search);
app.get('/rest/cities/:id', cities.findById);
app.post('/rest/cities', cities.save);
app.put('/rest/cities/:id', cities.update);
app.delete('/rest/cities/:id', cities.delete);

/*variables api*/
app.get('/rest/variables/:page/:size', variables.findAll);
app.get('/rest/variables/search/:page/:size/:name', variables.search);
app.get('/rest/variables/:id', variables.findById);
app.post('/rest/variables', variables.save);
app.put('/rest/variables/:id', variables.update);
app.delete('/rest/variables/:id', variables.delete);

/*users api*/
app.get('/rest/users/:page/:size', users.findAll);
app.get('/rest/users/search/:page/:size/:name', users.search);
app.get('/rest/users/:id', users.findById);
app.post('/rest/users', users.save);
app.put('/rest/users/:id', users.update);
app.delete('/rest/users/:id', users.delete);

/*types api*/
app.get('/rest/types/:page/:size', types.findAll);
app.get('/rest/types/search/:page/:size/:name', types.search);
app.get('/rest/types/:id', types.findById);
app.post('/rest/types', types.save);
app.put('/rest/types/:id', types.update);
app.delete('/rest/types/:id', types.delete);

/*types api*/
app.get('/rest/requests/:page/:size', requests.findAll);
app.get('/rest/requests/search/:page/:size/:name', requests.search);
app.get('/rest/requests/:id', requests.findById);
app.post('/rest/requests', requests.save);
app.put('/rest/requests/:id', requests.update);
app.delete('/rest/requests/:id', requests.delete);

/*Native Queries*/
app.get('/rest/native/countries/wrapper', countries.combo);
app.get('/rest/native/cities/wrapper/:name', cities.combo);
app.get('/rest/native/states/wrapper', states.combo);
app.get('/rest/native/variables/wrapper', variables.combo);


//app.get('/rest/public/json/:longitude/:latitude/:variables', public.uniquePoint);
//{lat: -40.23487, lng: -20.00003},
/*API Apps*/
app.get('/rest/public/json/:longitude/:latitude/:variables', public.findByCoordinates);


//set default port
app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
  console.log("CPTEC Node Server started on port", app.get('port'));
});
