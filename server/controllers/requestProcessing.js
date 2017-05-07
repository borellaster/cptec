var schedule = require('node-schedule');
var json2csv = require('json2csv');
var fs = require('fs');
var db = require('../models/index');
var path = require('path');
request = require('../models/').request;


var rule = new schedule.RecurrenceRule();
rule.minute = 50;
var fields = ['valor', 'data', 'hora', 'variavel'];

var requestTimer = schedule.scheduleJob(rule, function(){

    var rootPath = path.resolve(__dirname);
    rootPath = rootPath.substring(0, rootPath.length -24);

    request.findAll({order: 'id', where: {status: {$like: 0}}, include: {all: true}}).then(function (requests) {                      
      for (var i = 0; i < requests.length; i++) {
        var req = requests[0];
        var query = " select ST_VALUE(RAST, "+req.location+") as value, "+
                    " cast(date as date), time, variable "+
                    " from RASTER_DATA "+
                    " where date between '"+req.startdate+"' and '"+req.enddate+"' "+
                    " and variable in "+ req.variables + 
                    " order by variable, date, time ";
        db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(data) {
            var csv = json2csv({ data: data, fields: fields, del: ';'});
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