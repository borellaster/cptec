'use strict';
module.exports = function(sequelize, DataTypes) {
  var city = sequelize.define('city', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    geoid: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,   
    longitude: DataTypes.DOUBLE,
    altitude: DataTypes.DOUBLE
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        city.belongsTo(models.state, { foreignKey: 'state_id'})
      }
    }
  });
  return city;
};
