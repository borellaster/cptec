country = require('../models/').country;
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config')[env];
var sequelize = new Sequelize(config.url, config);

module.exports = {

  findAll(req, res) {
    var result = {data: []};
    country.findAll().then(function (countries) {
      result.data = countries;
      res.status(200).json(result);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  count(req, res) {
    country.findAll({attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]}).then(function (count) {
      res.status(200).json(count);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  findById(req, res) {
    country.findById(req.params.id).then(function (country) {
      res.status(200).json(country);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  save(req, res) {
    country.create(req.body).then(function (object) {
        res.status(200).json(object);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {    
    country.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    country.destroy({where: {id: req.params.id}}).then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }


};
