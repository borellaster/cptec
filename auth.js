user = require('./server/models/').user;

var Sequelize = require('sequelize');
var passport = require('passport');
var Strategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/server/config/config')[env];
var sequelize = new Sequelize(config.url, config);
var opts = {};

module.exports = function(){

  const opts = {};
  opts.secretOrKey = "mosaico@str";
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader(); 

  const strategy = new Strategy(opts, (payload, done) => {
    user.findById(payload.id)
    .then(user => {
      if (user) {
        return done(null, {
          id: user.id,
          email: user.email,
        });
      }
      return done(null, false);
    })
    .catch(error => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', {session: false}),
  };
};
