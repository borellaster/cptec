'use strict';
module.exports = function(sequelize, DataTypes) {
  var type = sequelize.define('type', {
    name: DataTypes.STRING,
    extension: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return type;
};
