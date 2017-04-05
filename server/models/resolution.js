'use strict';
module.exports = function(sequelize, DataTypes) {
  var resolution = sequelize.define('resolution', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return resolution;
};
