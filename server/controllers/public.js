model = require('../models/').model;
var db = require('../models/index');
var functions = require(__dirname + '/../tools/functions');

module.exports = {

  //data ok, modelo, cenário, intervalo, e uma variável ok

  findByFilter(req, res) {
    var adjusted = functions.findQuadrant(req.params.latitude,req.params.longitude);
    var latitude = adjusted.lat;
    var longitude = adjusted.lng;
    var start_month = req.params.start_month;
    var interval = req.params.interval;
    var interval_id = req.params.interval_id;
    var end_month = req.params.end_month;
    var start_year = req.params.start_year;
    var end_year = req.params.end_year;
    var variable = req.params.variable;
    var model = req.params.model;
    var model_id = req.params.model_id;


    var where = " where 1=1 ";//ok
    where += " and extract(month from date) between "+start_month+" and "+end_month;//ok
    where += " and extract(year from date) between "+start_year+" and "+end_year;//ok
    where += " and variable = '"+ variable + "'"; //ok
    where += " and upper(model) = upper('"+model+"') ";
    //where += " and upper(model_resolution) = upper('"+requisicao.model.resolution+"') ";
    //where += " and upper(model_coupled) = upper('"+requisicao.model.couple+"') ";
    //where += " and upper(scenario) = upper('"+requisicao.model.scenario+"') ";

    modelfreq.findAll({limit: 1,
                     where: {model_id: model_id, interval_id: interval_id},
                     }).then(function (modelfreqs) {
      console.log("new table -> "+modelfreqs[0].name);
      var query = " SELECT ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
                " to_char(date, 'YYYY-MM-DD') as date, time, variable, "+
                latitude + " as lat, "+
                longitude + " as lng "+
                " FROM "+ modelfreqs[0].name + " ";

      query += where + " order by variable, date, time ";

      db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(rasters) {
          res.status(200).json(rasters);
      }).catch(function (error) { 
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });
  }
};