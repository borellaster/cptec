city = require('../models/').city;
state = require('../models/').state;
var db = require('../models/index');

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    city.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     include: {all: true} 
                     }).then(function (cities) {
                      
      result.data = cities;
      db.sequelize.query("select count(id) from \"cities\" " , { 
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
    city.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     where: {name: {$iLike: '%'+name+'%'}},
                     include: {all: true}
                     }).then(function (cities) {
                      
      result.data = cities;
      db.sequelize.query("select count(id) from \"cities\"  "+where , { 
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
    var name="%", where="";
    if(req.params.name != undefined){
      name = req.params.name;
      where = " where name ilike '%"+name+"%' "; 
    }
    city.findAll({limit: 50, 
                     order: 'name',
                     where: {name: {$iLike: '%'+name+'%'}},
                     include: state
                     }).then(function (cities) {
                      
      result.data = cities;
      res.status(200).json(result);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },   

  findById(req, res) {
    city.findById(req.params.id, {include: {all: true}}).then(function (city) {
      res.status(200).json(city);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  save(req, res) {
    city.create(req.body).then(function (object) {
        res.status(200).json(object);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {    
    city.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(req.body);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    city.destroy({where: {id: req.params.id}}).then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },
};
