'use strict';
module.exports = function(sequelize, DataTypes) {
  var couple = sequelize.define('couple', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return couple;
};
