country = require('../models/').country;
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config')[env];
var sequelize = new Sequelize(config.url, config);

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    country.findAll({offset: req.params.size * (req.params.page-1), 
                    limit: req.params.size}).then(function (countries) {
                      
      result.data = countries;
      sequelize.query("select count(id) from \"countries\" ", { 
                type:Sequelize.QueryTypes.SELECT}).then(function(count) {
        result.count = count[0].count;
        result.page = req.params.page;
        result.pages = Math.ceil(result.count / req.params.size);  
        res.status(200).json(result);
      });      
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
