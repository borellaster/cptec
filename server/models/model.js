'use strict';
module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define('model', {
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    couple: DataTypes.STRING,
    scenario: DataTypes.STRING,
    resolution: DataTypes.STRING,
    start_year: DataTypes.INTEGER,
    end_year: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return model;
};
