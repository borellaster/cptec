'use strict';
module.exports = function(sequelize, DataTypes) {
  var requestPoint = sequelize.define('requestPoint', {
    latitude: DataTypes.DOUBLE,   
    longitude: DataTypes.DOUBLE,
    request_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return requestPoint;
};