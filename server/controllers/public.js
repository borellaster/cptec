var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config')[env];
var sequelize = new Sequelize(config.url, config);
var functions = require(__dirname + '/../tools/functions');

module.exports = {

  findByCoordinates(req, res) {
    var adjusted = functions.findQuadrant(req.params.latitude,req.params.longitude);
    var latitude = adjusted.lat;
    var longitude = adjusted.lng;
    var variables = req.params.variables;
    var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
                " cast(date as date), time, variable "+
                " from RASTER_DATA "+
                " where date >= current_timestamp - INTERVAL '10 days' and "+
                "       variable in "+ variables + 
                " order by variable, date, time   ";
    sequelize.query(query, { 
      type:Sequelize.QueryTypes.SELECT}).then(function(data) {
        var result = {data: []};      
        result.data = data
        res.json(result)
    });
  },  



  /*uniquePoint(req, res) {
    var adjusted = functions.findQuadrant(req.params.latitude,req.params.longitude);
    var latitude = adjusted.lat;
    var longitude = adjusted.lng;
    var variables = req.params.variables;
    console.log(req.params.variables);
    var query = " select ID, ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4326)), date "+
                " from RASTER_DATA "+
                " where ST_INTERSECTS(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4326)) and "+
                "   date >= current_timestamp - INTERVAL '10 days' and " +
                "   variable in "+variables+ 
                " order by date, time   ";
    console.log(query);
    sequelize.query(query, { 
      type:Sequelize.QueryTypes.SELECT}).then(function(data) {
        var result = {data: []};      
        result.data = data
        res.json(result)
    });
  },*/  

};