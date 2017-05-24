'use strict';
module.exports = function(sequelize, DataTypes) {
  var country = sequelize.define('country', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    zoom: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return country;
};
