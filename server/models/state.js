'use strict';
module.exports = function(sequelize, DataTypes) {
  var state = sequelize.define('state', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    geoid: DataTypes.STRING   
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        state.belongsTo(models.country, { foreignKey: 'country_id'})
      }
    }
  });
  return state;
};
