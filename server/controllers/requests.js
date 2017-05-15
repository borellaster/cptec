request = require('../models/').request;
type = require('../models/').type;
point = require('../models/').point;
var db = require('../models/index');

/*PROCESSAMENTO*/
var path = require('path');
var dateFormat = require('dateformat');
var functions = require(__dirname + '/../tools/functions');
var jsonfile = require('jsonfile');
var js2xmlparser = require("js2xmlparser");
var zip = new require('node-zip')();
var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['value', 'date', 'time', 'variable'];
var fieldNames = ['Valor', 'Data', 'Hora', 'Variavel'];

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    request.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     include: {all: true}
                     }).then(function (requests) {
                      
      result.data = requests;
      db.sequelize.query("select count(id) from \"requests\" " , { 
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
    request.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     where: {name: {$iLike: '%'+name+'%'}},
                     include: {all: true}
                     }).then(function (requests) {
                      
      result.data = requests;
      db.sequelize.query("select count(id) from \"requests\"  "+where , { 
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

  findById(req, res) {
    request.findById(req.params.id, {include: {all: true}}).then(function (request) {
      res.status(200).json(request);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  save(req, res) {    
    request.create(req.body).then(function (object) {
        res.status(200).json(object);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {    
    request.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(req.body);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    request.destroy({where: {id: req.params.id}}).then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  process(req, res) {    
    request.findById(req.params.id, {include: {all: true}}).then(function (req) {
        var rootPath = path.resolve(__dirname);
        rootPath = rootPath.substring(0, rootPath.length -24);        
        var adjusted = functions.findQuadrant(req.location.coordinates[0], req.location.coordinates[1]);
        var latitude = adjusted.lat;
        var longitude = adjusted.lng; 

        var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
        " to_char(date, 'YYYY-MM-DD') as date, time, variable "+
        " from RASTER_DATA "+
        " where date between '"+dateFormat(req.start_date, "yyyy-mm-dd h:MM:ss")+"' and '"+dateFormat(req.end_date, "yyyy-mm-dd h:MM:ss")+"' "+
        " and variable in ("+ req.variables + ")" +
        " order by variable, date, time ";
        db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(rasters) {
            if(req.type.extension == '.csv'){
                var file = rootPath + 'req'+req.id+'.csv';
                var csv = json2csv({ data: rasters, fields: fields, fieldNames: fieldNames, del: ';'});
                fs.writeFileSync(file, csv, function(err) {
                    if (err) {
                        throw err;
                    }
                });
            } else if(req.type.extension == '.json'){
                var file = rootPath + 'req'+req.id+'.json';
                jsonfile.writeFile(file, rasters, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            } else if(req.type.extension == '.xml'){
                var xml = js2xmlparser.parse("data", rasters);
                var file = rootPath + 'req'+req.id+'.xml';
                fs.writeFile(file, xml, function(err) {
                    if (err) {
                        throw err;
                    }
                });                
            }
        }).catch(function (error) { 

        });          
    }).catch(function (error){
      
    });
  },  


};
