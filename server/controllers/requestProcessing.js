var schedule = require('node-schedule');
var json2csv = require('json2csv');
var fs = require('fs');
var db = require('../models/index');
var path = require('path');
//var os = require('os');


var rule = new schedule.RecurrenceRule();
rule.minute = 50;
var fields = ['id', 'name'];

var requestTimer = schedule.scheduleJob(rule, function(){

    var rootPath = path.resolve(__dirname);
    rootPath = rootPath.substring(0, rootPath.length -24);

    var result = {data: []};
    db.sequelize.query("select id, name from \"countries\" order by name ", { 
   		type:db.Sequelize.QueryTypes.SELECT}).then(function(countries) {
        var csv = json2csv({ data: countries, fields: fields, del: ';'});
		fs.writeFile(rootPath + 'req_2.csv', csv, function(err) {
		  if (err) throw err;
		  console.log('CSV file created');
		});
    }).catch(function (error) {
      
    });
});