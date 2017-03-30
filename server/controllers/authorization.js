User = require('../models/').user;
var db = require('../models/index');
var HttpStatus = require('http-status');
var jwt = require('jwt-simple');

module.exports = {

  login(req, res) {
  	var result = {data: []};
    if (req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;

	  User.findOne({where: {username: req.body.username}}).then(function (user) {  
        if (User.isPassword(user.password, password)) {
          const payload = { id: user.id };
          res.json({
            token: jwt.encode(payload, 'Libr##'),
          });
        } else {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
      }).catch(function (error) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
      });         
 	}else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  } 

};
