var schedule = require('node-schedule');
var json2csv = require('json2csv');
var fs = require('fs');
var db = require('../models/index');
var path = require('path');
request = require('../models/').request;
var dateFormat = require('dateformat');


var rule = new schedule.RecurrenceRule();
rule.minute = 26;
var fields = ['valor', 'data', 'hora', 'variavel'];

var requestTimer = schedule.scheduleJob(rule, function(){

    var rootPath = path.resolve(__dirname);
    rootPath = rootPath.substring(0, rootPath.length -24);

    request.findAll({order: 'id', where: {status: 0}, include: {all: true}}).then(function (requests) {                      
      for (var i = 0; i < requests.length; i++) {
        var req = requests[0];
        var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+req.location.coordinates+"), 4236)) as value, "+
        " cast(date as date), time, variable "+
        " from RASTER_DATA "+
        " where date between '"+dateFormat(req.start_date, "yyyy-mm-dd h:MM:ss")+"' and '"+dateFormat(req.end_date, "yyyy-mm-dd h:MM:ss")+"' "+
        " and variable in ('"+ req.variables + "')" +
        " order by variable, date, time ";
        db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(rasters) {
            var csv = json2csv({ data: rasters, fields: fields, del: ';'});
            fs.writeFile(rootPath + 'req'+req.id+'.csv', csv, function(err) {
              if (err) throw err;
              console.log('req'+req.id+'.csv created');
            });            
        }).catch(function (error) {            
        });         
          
      }
    }).catch(function (error) {      
    });    

    /*var result = {data: []};
    db.sequelize.query("select id, name from \"countries\" order by name ", { 
   		type:db.Sequelize.QueryTypes.SELECT}).then(function(countries) {
        var csv = json2csv({ data: countries, fields: fields, del: ';'});
		fs.writeFile(rootPath + 'req_2.csv', csv, function(err) {
		  if (err) throw err;
		  console.log('CSV file created');
		});
    }).catch(function (error) {
      
    });*/
});