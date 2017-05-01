'use strict';
module.exports = function(sequelize, DataTypes) {
  var request = sequelize.define('request', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    query_type: DataTypes.STRING,
    variables: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    model_id: DataTypes.INTEGER,
    interval_id: DataTypes.INTEGER
  }, {
    underscored: true,
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