country = require('../models/').country;
var db = require('../models/index');
var fs = require('fs');
var base64 = require('file-base64');

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    country.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name'
                     }).then(function (countries) {
                      
      result.data = countries;
      db.sequelize.query("select count(id) from \"countries\" " , { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(count) {
        result.count = parseInt(count[0].count);
        result.page = parseInt(req.params.page);
        result.pages = parseInt(Math.ceil(result.count / req.params.size));  
        res.status(200).json(result);
      });      
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  search(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    var name="%", where="";
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    if(req.params.name != undefined){
      name = req.params.name;
      where = " where name ilike '%"+name+"%' "; 
    }
    country.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     where: {name: {$iLike: '%'+name+'%'}}
                     }).then(function (countries) {
                      
      result.data = countries;
      db.sequelize.query("select count(id) from \"countries\"  "+where , { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(count) {
        result.count = parseInt(count[0].count);
        result.page = parseInt(req.params.page);
        result.pages = parseInt(Math.ceil(result.count / req.params.size));  
        res.status(200).json(result);
      });      
    }).catch(function (error) {
      res.status(500).json(error);
    });
  }, 

  combo(req, res) {
    var result = {data: []};
    db.sequelize.query("select id, name from \"countries\" order by name ", { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(countries) {
        result.data = countries;  
        res.status(200).json(result);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },   

  findById(req, res) {
    country.findById(req.params.id).then(function (country) {
      var base64String = country.file;
      base64.decode(base64String, 'C:/Lighthouse.new.jpg', function(err, output) {        
      });
      res.status(200).json(country);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  save(req, res) {
    base64.encode(req.body.file, function(err, base64String) {      
      req.body.file = base64String; 
      country.create(req.body).then(function (object) {
        res.status(200).json(object);
      }).catch(function (error){
        res.status(500).json(error);
      });      
    });
  },

  update(req, res) {    
    country.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(req.body);
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
