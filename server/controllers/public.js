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
        var startmonth = req.params.startmonth;
        var startyear = req.params.startyear;
        var endmonth = req.params.endmonth;
        var endyear = req.params.endyear;
        var where = " where 1=1 ";
        where += " and extract(month from date) between "+startmonth+" and "+endmonth;
        where += " and extract(year from date) between "+startyear+" and "+endyear;
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
                    " order by date, time LIMIT "+req.params.size+" OFFSET "+(req.params.page -1) * req.params.size;
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

  findYears(req, res) {
    var query = " select DISTINCT(EXTRACT(year from date)) as year from raster_data order by 1 ";
    var result = {data: []};  
    db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(data) {
        result.data = data;
        res.json(result)
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error);
    });
  },

  findMonths(req, res) {
    var query = " select DISTINCT(EXTRACT(month from date)) as month, "+
                "  case "+
                "      when EXTRACT(month from date) = 1 then 'Janeiro' "+
                "      when EXTRACT(month from date) = 2 then 'Fevereiro' "+
                "      when EXTRACT(month from date) = 3 then 'Março' "+
                "      when EXTRACT(month from date) = 4 then 'Abril' "+
                "      when EXTRACT(month from date) = 5 then 'Maio' "+
                "      when EXTRACT(month from date) = 6 then 'Junho' "+
                "      when EXTRACT(month from date) = 7 then 'Julho' "+
                "      when EXTRACT(month from date) = 8 then 'Agosto' "+
                "      when EXTRACT(month from date) = 9 then 'Setembro' "+
                "      when EXTRACT(month from date) = 10 then 'Outubro' "+
                "      when EXTRACT(month from date) = 11 then 'Novembro' "+
                "      when EXTRACT(month from date) = 12 then 'Dezembro' "+
                "  end as nome "+
                "  from raster_data order by 1 ";
    var result = {data: []};  
    db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(data) {
        result.data = data;
        res.json(result)
    }).catch(function (error) {
        console.log(error);
        res.status(500).json(error);
    });
  },      

};