'use strict';
module.exports = function(sequelize, DataTypes) {
  var city = sequelize.define('city', {
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,   
    longitude: DataTypes.DOUBLE,
    area: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    sts: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER
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
