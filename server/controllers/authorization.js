user = require('../models/').user;
var db = require('../models/index');
var HttpStatus = require('http-status');

module.exports = {

  login(req, res) {
    if (req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;      
      user.findOne({ where: { username } })
      .then(user => {
        console.log(user.password);
        if (Users.isPassword(user.password, password)) {
          const payload = { id: user.id };
          res.json({
            token: jwt.encode(payload, config.jwtSecret),
          });
        } else {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
      })
      .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  }


};
