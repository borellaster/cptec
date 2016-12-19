'use strict';
module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    abbreviation: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Country;
};
