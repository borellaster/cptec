'use strict';
module.exports = function(sequelize, DataTypes) {
  var configuration = sequelize.define('configuration', {
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    smtp: DataTypes.STRING,
    pop: DataTypes.STRING,
    port: DataTypes.INTEGER,
    password: DataTypes.STRING,
    ssl: DataTypes.BOOLEAN,
    tls: DataTypes.BOOLEAN,
    link: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return configuration;
};