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
                " order by variable, date, time ";
    var result = {data: []};  
    sequelize.query(query, {type:Sequelize.QueryTypes.SELECT}).then(function(data) {
        result.data = data;
        res.json(result)
    });
  }, 

  findByCoordinatesPag(req, res) {
    var adjusted = functions.findQuadrant(req.params.latitude,req.params.longitude);
    var latitude = adjusted.lat;
    var longitude = adjusted.lng;
    var variables = req.params.variables;
    if(req.params.page <= 0) {
      req.params.page = 1;
    } 

    var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
                " cast(date as date), time, variable "+
                " from RASTER_DATA "+
                " where date >= current_timestamp - INTERVAL '10 days' and "+
                "       variable in "+ variables + 
                " order by variable, date, time LIMIT "+req.params.size+" OFFSET "+req.params.page;
    var queryCount = " select count(*),ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236) "+                
                " from RASTER_DATA "+
                " where date >= current_timestamp - INTERVAL '10 days' and "+
                "       variable in "+ variables; 

    var result = {data: [], count: 0, page: 1, pages: 1};  
    sequelize.query(query, {type:Sequelize.QueryTypes.SELECT}).then(function(data) {
        sequelize.query(queryCount, {type:Sequelize.QueryTypes.SELECT}).then(function(count) {                 
            result.data = data;
            result.count = parseInt(count[0].count);
            result.page = parseInt(req.params.page);
            result.pages = parseInt(Math.ceil(result.count / req.params.size)); 
            res.json(result)
        });
    });
  },   

};