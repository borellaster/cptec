'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    password_tmp: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return user;
};
