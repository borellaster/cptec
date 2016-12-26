'use strict';
module.exports = function(sequelize, DataTypes) {
  var variable = sequelize.define('variable', {
    description: DataTypes.STRING,
    nickname: DataTypes.STRING,
    unit: DataTypes.STRING,
    color_map: DataTypes.JSON
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return variable;
};
