'use strict';
module.exports = function(sequelize, DataTypes) {
  var interval = sequelize.define('interval', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    variables: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return interval;
};
