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
    link: DataTypes.STRING,
    contact: DataTypes.STRING,
    link_visualization: DataTypes.STRING,
    link_api: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return configuration;
};