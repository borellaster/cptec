country = require('../models/').country;
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config')[env];
var sequelize = new Sequelize(config.url, config);
var async = require('async');

module.exports = {

  index(req, res) {
    /*var result, selectErr;
    result = {data: [], count: 0, page: 1, pages: 1};
    async.series({
      select: function(next) {
        country.findAll().then(function (countries) {
          result.data = countries;
          next();
        }).catch(function (error) {
          selectErr = error;
        });
      },
      count: function(next) {
        country.findAll({attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'id']]}).then(function (count) {
          result.count = count;
          result.page = 1;
          result.pages = Math.ceil(count / opts.size);
          next();
        }).catch(function (error) {
          selectErr = error;
        });
      },
      back: function(err, results) {
        var duvido = {data: [], count: 0, page: 1, pages: 1};
        duvido.data = results.select; 
        return duvido;
      }     
    });*/


    async.series({
      select: function(next) {
        country.findAll().then(function (countries) {
          result.data = countries;
          next();
        }).catch(function (error) {
          selectErr = error;
        });
      },
      count: function(next) {
        country.findAll({attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'id']]}).then(function (count) {
          result.count = count;
          result.page = 1;
          result.pages = Math.ceil(count / opts.size);
          next();
        }).catch(function (error) {
          selectErr = error;
        });
      }
    }, function(err, results) {
        res.status(200).json(results);
    });    

  },

  /*index(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    country.findAll().then(function (countries) {
      result.data = countries;
      res.status(200).json(result);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },*/

  /*count(req, res) {
    country.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'id']]
    })
    .then(function (count) {
      res.status(200).json(count);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },*/  



  /*raw(req, res) {
    sequelize.query("SELECT id, name, abbreviation FROM \"Countries\" ", { 
      type:Sequelize.QueryTypes.SELECT}).then(function(countries) {
        var result = {data: []};      
        result.data = countries
        res.json(result)
    });
  }, */ 

  show(req, res) {
    country.findById(req.params.id).then(function (country) {
      res.status(200).json(country);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
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
