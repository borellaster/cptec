'use strict';
module.exports = function(sequelize, DataTypes) {
  var mail = sequelize.define('mail', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return mail;
};
