'use strict';
module.exports = function(sequelize, DataTypes) {
  var scenario = sequelize.define('scenario', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return scenario;
};
