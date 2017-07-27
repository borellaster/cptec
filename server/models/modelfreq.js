'use strict';
module.exports = function(sequelize, DataTypes) {
  var modelfreq = sequelize.define('modelfreq', {
    name: DataTypes.STRING,
    model_id: DataTypes.INTEGER,
    interval_id: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "models_freq",
    classMethods: {
      associate: function(models) {
        modelfreq.belongsTo(models.model, { foreignKey: 'model_id'}),
        modelfreq.belongsTo(models.interval, { foreignKey: 'interval_id'})
      }
    }
  });
  return modelfreq;
};
