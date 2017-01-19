var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config')[env];
var sequelize = new Sequelize(config.url, config);
var functions = require(__dirname + '/../tools/functions');

module.exports = {

  raw(req, res) {
    var adjusted = functions.findQuadrant(req.params.latitude,req.params.longitude);
    var latitude = adjusted.lat;
    var longitude = adjusted.lng;
    var query = " select ID, ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4326)), date "+
                " from RASTER_DATA "+
                " where ST_INTERSECTS(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4326)) and "+
                " variable = 'OCIS' ";
    sequelize.query(query, { 
      type:Sequelize.QueryTypes.SELECT}).then(function(data) {
        var result = {data: []};      
        result.data = data
        res.json(result)
    });
  },

  findByCity(req, res) {
    var adjusted = functions.findQuadrant(req.params.latitude,req.params.longitude);
    var latitude = adjusted.lat;
    var longitude = adjusted.lng;
    var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
                " cast(date as date), time, variable "+
                " from RASTER_DATA "+
                " where date >= current_timestamp - INTERVAL '10 days' and "+
                "       variable in ('OCIS') "+
                " order by date, time   ";
    sequelize.query(query, { 
      type:Sequelize.QueryTypes.SELECT}).then(function(data) {
        var result = {data: []};      
        result.data = data
        res.json(result)
    });
  },  

  //LONG -52.407
  //LAT -28.263

};