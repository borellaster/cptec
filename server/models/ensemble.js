'use strict';
module.exports = function(sequelize, DataTypes) {
  var ensemble = sequelize.define('ensemble', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return ensemble;
};
