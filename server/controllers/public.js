model = require('../models/').model;
var db = require('../models/index');
var functions = require(__dirname + '/../tools/functions');

module.exports = {

  findByCoordinates(req, res) {
    var adjusted = functions.findQuadrant(req.params.latitude,req.params.longitude);
    var latitude = adjusted.lat;
    var longitude = adjusted.lng;
    var variables = req.params.variables;
    var startdate = req.params.startdate;
    var enddate = req.params.enddate;
    var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
                " cast(date as date), time, variable "+
                " from RASTER_DATA "+
                " where date between '"+startdate+"' and '"+enddate+"' "+
                " and variable in "+ variables + 
                " order by variable, date, time ";
    var result = {data: []};  
    db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(data) {
        result.data = data;
        res.json(result)
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error);
    });
  }, 

  findByCoordinatesPag(req, res) {
    var modelSearch = undefined;
    model.findById(req.params.id).then(function (model) {
        modelSearch = model;
        var adjusted = functions.findQuadrant(req.params.latitude,req.params.longitude);
        var latitude = adjusted.lat;
        var longitude = adjusted.lng;
        var variables = req.params.variables;
        var startdate = req.params.startdate;
        var enddate = req.params.enddate;
        var where = " where 1=1 ";
        where += " and date between '"+startdate+"' and '"+enddate+"' ";
        where += " and variable in "+ variables;
        where += " and upper(model) = upper('"+modelSearch.model+"') ";
        //where += " and upper(scenario) = upper('"+modelSearch.scenario+"') ";
        where += " and upper(model_resolution) = upper('"+modelSearch.resolution+"') ";
        if(req.params.page <= 0) {
          req.params.page = 1;
        }
        
        var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
                    " cast(date as date), time, variable "+
                    " from RASTER_DATA "+where+
                    " order by variable, date, time LIMIT "+req.params.size+" OFFSET "+req.params.page;
        var queryCount = " select count(*),ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236) "+                
                    " from RASTER_DATA "+where; 

        var result = {data: [], count: 0, page: 1, pages: 1};  
        db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(data) {
            db.sequelize.query(queryCount, {type:db.Sequelize.QueryTypes.SELECT}).then(function(count) {                 
                result.data = data;
                result.count = parseInt(count[0].count);
                result.page = parseInt(req.params.page);
                result.pages = parseInt(Math.ceil(result.count / req.params.size)); 
                res.json(result)
            });
        });      
    }).catch(function (error){
      
    });

  },   

};


/*

        var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
                    " cast(date as date), time, variable "+
                    " from RASTER_DATA "+
                    " where date between '"+startdate+"' and '"+enddate+"' "+
                    " and variable in "+ variables + 
                    " order by variable, date, time LIMIT "+req.params.size+" OFFSET "+req.params.page;
        var queryCount = " select count(*),ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236) "+                
                    " from RASTER_DATA "+
                    " where date between '"+startdate+"' and '"+enddate+"' "+
                    " and variable in "+ variables;

*/