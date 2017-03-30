variable = require('../models/').variable;

var db = require('../models/index');

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    variable.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'description'
                     }).then(function (variables) {
                      
      result.data = variables;
      db.sequelize.query("select count(id) from \"variables\" " , { 
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
      where = " where description ilike '%"+name+"%' "; 
    }
    variable.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'description',
                     where: {description: {$iLike: '%'+name+'%'}}
                     }).then(function (variables) {
                      
      result.data = variables;
      db.sequelize.query("select count(id) from \"variables\"  "+where , { 
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
    db.sequelize.query("select id, description, nickname from \"variables\" order by id ", { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(variables) {
        result.data = variables;  
        res.status(200).json(result);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },   

  findById(req, res) {
    variable.findById(req.params.id).then(function (variable) {
      res.status(200).json(variable);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  save(req, res) {
    variable.create(req.body).then(function (object) {
        res.status(200).json(object);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {    
    variable.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(req.body);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    variable.destroy({where: {id: req.params.id}}).then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }


};
