var schedule = require('node-schedule');
var json2csv = require('json2csv');
var fs = require('fs');
var db = require('../models/index');
var path = require('path');
request = require('../models/').request;
var dateFormat = require('dateformat');
var functions = require(__dirname + '/../tools/functions');
var jsonfile = require('jsonfile');
var js2xmlparser = require("js2xmlparser");
var zip = new require('node-zip')();

var rule = new schedule.RecurrenceRule();
rule.minute = 36;
var fields = ['value', 'date', 'time', 'variable'];
var fieldNames = ['Valor', 'Data', 'Hora', 'Variavel'];
var result = {data: []}; 

var requestTimer = schedule.scheduleJob(rule, function(){

    /*var rootPath = path.resolve(__dirname);
    rootPath = rootPath.substring(0, rootPath.length -24);  */

   
    /*var xml = js2xmlparser.parse("person", obj); 
    var file = rootPath + 'req1.xml';
    fs.writeFile(file, xml, function(err) {
        if (err) {
            throw err;
        }
    }); 

    zip.file(file, xml);
    var data = zip.generate({base64:false,compression:'DEFLATE'});
    fs.writeFileSync(rootPath +'req1.zip', data, 'binary');*/

    /*request.findAll({order: 'id', where: {status: 0}, include: {all: true}}).then(function (requests) {                      
      requests.forEach(function (req) {
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
                var xml = js2xmlparser.parse("person", obj);
                var file = rootPath + 'req'+req.id+'.xml';
                fs.writeFile(file, xml, function(err) {
                    if (err) {
                        throw err;
                    }
                });                
            }
        }).catch(function (error) { 

        });         
          
      })
    }).catch(function (error) {

    });*/
});