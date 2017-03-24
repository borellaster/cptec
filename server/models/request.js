'use strict';
module.exports = function(sequelize, DataTypes) {
  var request = sequelize.define('request', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,    
    type_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        request.belongsTo(models.type, { foreignKey: 'type_id'})
      }
    }
  });
  return request;
};