'use strict';
module.exports = function(sequelize, DataTypes) {
  var country = sequelize.define('country', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    geoid: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return country;
};
