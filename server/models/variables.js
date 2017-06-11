'use strict';
module.exports = function(sequelize, DataTypes) {
  var variable = sequelize.define('variable', {
    description: DataTypes.STRING,
    nickname: DataTypes.STRING,
    type: DataTypes.STRING,
    active: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return variable;
};
