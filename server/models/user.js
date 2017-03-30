'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    password_tmp: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  },
    {
      underscored: true,
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.set('password', bcrypt.hashSync(user.password, salt));
        },
      },
      classMethods: {
        isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
      },
    });
  return user;
};
