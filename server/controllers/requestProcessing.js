var schedule = require('node-schedule');
var json2csv = require('json2csv');
var fs = require('fs');
var db = require('../models/index');
var path = require('path');
request = require('../models/').request;
var dateFormat = require('dateformat');
var functions = require(__dirname + '/../tools/functions');
var jsonfile = require('jsonfile');

var rule = new schedule.RecurrenceRule();
rule.minute = 54;
var fields = ['value', 'date', 'time', 'variable'];
var fieldNames = ['Valor', 'Data', 'Hora', 'Variavel'];
var result = {data: []}; 

var requestTimer = schedule.scheduleJob(rule, function(){

    var rootPath = path.resolve(__dirname);
    rootPath = rootPath.substring(0, rootPath.length -24);
  

    request.findAll({order: 'id', where: {status: 0}, include: {all: true}}).then(function (requests) {                         
      for (var i = 0; i < requests.length; i++) {
        var req = requests[i];
        var adjusted = functions.findQuadrant(req.location.coordinates[0], req.location.coordinates[1]);
        var latitude = adjusted.lat;
        var longitude = adjusted.lng; 

        var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
        " to_char(date, 'YYYY-MM-DD') as date, time, variable "+
        " from RASTER_DATA "+
        " where date between '"+dateFormat(req.start_date, "yyyy-mm-dd h:MM:ss")+"' and '"+dateFormat(req.end_date, "yyyy-mm-dd h:MM:ss")+"' "+
        " and variable in ('"+ req.variables + "')" +
        " order by variable, date, time ";
        db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(rasters) {
            console.log(req.type.extension);
            if(req.type.extension = '.csv'){
                var csv = json2csv({ data: rasters, fields: fields, fieldNames: fieldNames, del: ';'});
                fs.writeFile(rootPath + 'req'+req.id+'.csv', csv, function(err) {
                  if (err) throw err;
                  console.log('req'+req.id+'.csv created');
                });
            } else if(req.type.extension = '.json'){
                var file = rootPath + 'req'+req.id+'.json';
                jsonfile.writeFile(file, rasters, function (err) {
                  console.log('req'+req.id+'.json created');
                });
            }            
        }).catch(function (error) {            
        });         
          
      }
    }).catch(function (error) {      
    });
});