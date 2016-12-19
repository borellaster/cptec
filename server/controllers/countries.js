Country = require('../models/').Country;
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config')[env];
var sequelize = new Sequelize(config.url, config);

module.exports= {
  index(req, res) {
    Country.findAll()
      .then(function (countries) {
        res.status(200).json(countries);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  raw(req, res) {
    sequelize.query("SELECT id, name, abbreviation FROM \"Countries\" where id = 2", { type:Sequelize.QueryTypes.SELECT}).then(function(countries) {
      var result = {data: []};      
      result.data = countries
      res.json(result)
    });
  },  

  show(req, res) {
    Country.findById(req.params.id)
    .then(function (country) {
      res.status(200).json(country);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    Country.create(req.body)
      .then(function (object) {
        res.status(200).json(object);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {    
    Country.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    Country.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
