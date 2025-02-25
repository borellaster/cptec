model = require('../models/').model;
var db = require('../models/index');
var functions = require(__dirname + '/../tools/functions');

module.exports = {

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

    var where = " where 1=1 ";
    where += " and extract(month from date) between "+start_month+" and "+end_month;
    where += " and extract(year from date) between "+start_year+" and "+end_year;
    where += " and variable = '"+ variable + "'";
    where += " and upper(model) = upper('"+model+"') ";
    //tem que ver aqui, talvez tenha que fazeruma chamada para descobrir resto dos filtros do modelo
    //where += " and upper(model_resolution) = upper('"+requisicao.model.resolution+"') ";
    //where += " and upper(model_coupled) = upper('"+requisicao.model.couple+"') ";
    //where += " and upper(scenario) = upper('"+requisicao.model.scenario+"') ";

    modelfreq.findAll({limit: 1, include: {all: true},
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
          //res.status(200).json(rasters);
          if(modelfreqs[0].model.correct_days == 'S'){
            rasters = functions.ajustaDatas(rasters);
          }
          res.status(200).json(rasters);
      }).catch(function (error) { 
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  findByBrazil(req, res) {
    var start_month = req.params.start_month;
    var interval = req.params.interval;
    var interval_id = req.params.interval_id;
    var end_month = req.params.end_month;
    var start_year = req.params.start_year;
    var end_year = req.params.end_year;
    var variable = req.params.variable;
    var model = req.params.model;
    var model_id = req.params.model_id;

    var where = "";
    where += " and extract(month from date) between "+start_month+" and "+end_month;
    where += " and extract(year from date) between "+start_year+" and "+end_year;
    where += " and variable = '"+ variable + "'";
    where += " and upper(model) = upper('"+model+"') ";

    modelfreq.findAll({limit: 1, include: {all: true},
                     where: {model_id: model_id, interval_id: interval_id},
                     }).then(function (modelfreqs) {

      var query = " select st_X(geom) as latitude, st_Y(geom) as longitude, val, ";
          query+= "  variable, to_char(date, 'YYYY-MM-DD') as date ";
          query+= " from ";
          query+= " ( ";
          query+= " select(st_pixelaspoints(( ";
          query+= " SELECT(ST_Union(ST_Clip(rast, ST_Transform((SELECT ST_GeomFromText('POLYGON((-76.640625 -35.31736632923786, -76.640625 7.18810087117902, -31.46484375 7.18810087117902, -31.46484375 -35.31736632923786, -76.640625 -35.31736632923786))',4236) As wgs_geom), ST_SRID(rast) ) ) ) ) AS rast),1)).*, variable, date ";
          query+= " FROM "+ modelfreqs[0].name;
          query+= " WHERE ST_Intersects(rast, (SELECT ST_GeomFromText('POLYGON((-76.640625 -35.31736632923786, -76.640625 7.18810087117902, -31.46484375 7.18810087117902, -31.46484375 -35.31736632923786, -76.640625 -35.31736632923786))',4236) As wgs_geom)) ";
          query+= where + " group by variable, date) r1 ";

      db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(rasters) {
          if(modelfreqs[0].model.correct_days == 'S'){
            rasters = functions.ajustaDatas(rasters);
          }
          res.status(200).json(rasters);
      }).catch(function (error) { 
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });
  }
};