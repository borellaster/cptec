model = require('../models/').model;
var db = require('../models/index');

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    model.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name'
                     }).then(function (models) {
                      
      result.data = models;
      db.sequelize.query("select count(id) from \"models\" " , { 
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
    model.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     where: {name: {$iLike: '%'+name+'%'}}
                     }).then(function (models) {
                      
      result.data = models;
      db.sequelize.query("select count(id) from \"models\"  "+where , { 
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
    db.sequelize.query("select id, name, model, couple, scenario, resolution, start_year, end_year from \"models\" order by sequence ", { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(models) {
        result.data = models; 
        //cp /Users/borella/Documents/teste.key /Users/borella/Documents/Mestrado/
        var shell = require('shelljs');
        shell.exec('pgsql2shp -f "/Users/borella/Documents/teste.shp" -h localhost -p 5432 -u cptec -P Cptec10 cptec "select * from raster_data where id =1 "');
 
        res.status(200).json(result);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },  

  findById(req, res) {
    model.findById(req.params.id).then(function (model) {
      res.status(200).json(model);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  save(req, res) {
    model.create(req.body).then(function (object) {
        res.status(200).json(object);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {    
    model.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(req.body);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    model.destroy({where: {id: req.params.id}}).then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }


};
