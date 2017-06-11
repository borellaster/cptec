'use strict';
var sha1 = require('sha1');

module.exports = function(sequelize, DataTypes) {
  var request = sequelize.define('request', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    query_type: DataTypes.STRING,
    variables: DataTypes.STRING,
    start_month: DataTypes.INTEGER,
    end_month: DataTypes.INTEGER,
    start_year: DataTypes.INTEGER,
    end_year: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    model_id: DataTypes.INTEGER,
    interval_id: DataTypes.INTEGER,
    location: DataTypes.GEOMETRY,
    file: DataTypes.STRING,
    hash: DataTypes.STRING,
    utilizacao: DataTypes.STRING,
    instituicao: DataTypes.STRING
  }, {
    underscored: true,
    hooks: {
      beforeCreate: request => {
        var hash = sha1(request.name + new Date());
        request.set('hash', hash);
      },
    },    
    classMethods: {
      associate: function(models) {
        request.belongsTo(models.type, { foreignKey: 'type_id'}),
        request.belongsTo(models.model, { foreignKey: 'model_id'}),
        request.belongsTo(models.interval, { foreignKey: 'interval_id'})
      }
    }
  });
  return request;
};