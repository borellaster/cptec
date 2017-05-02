var schedule = require('node-schedule');
var json2csv = require('json2csv');
var fs = require('fs');
var db = require('../models/index');


var rule = new schedule.RecurrenceRule();
rule.minute = 00;
var fields = ['id', 'name'];

var requestTimer = schedule.scheduleJob(rule, function(){

    var result = {data: []};
    db.sequelize.query("select id, name from \"countries\" order by name ", { 
   		type:db.Sequelize.QueryTypes.SELECT}).then(function(countries) {
        var csv = json2csv({ data: countries, fields: fields, del: ';'});
		fs.writeFile('C:/req_1.csv', csv, function(err) {
		  if (err) throw err;
		  console.log('CSV file created');
		});
    }).catch(function (error) {
      
    });
});