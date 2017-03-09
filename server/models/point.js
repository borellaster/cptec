'use strict';
module.exports = function(sequelize, DataTypes) {
  var point = sequelize.define('point', {
    latitude: DataTypes.DOUBLE,   
    longitude: DataTypes.DOUBLE,
    request_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        point.belongsTo(models.request, { 
          foreignKey: 'request_id'
        });        
      }
    }
  });
  return point;
};