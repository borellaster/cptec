var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config')[env];
var sequelize = new Sequelize(config.url, config);
var functions = require(__dirname + '/../../util/functions');

module.exports = {

  raw(req, res) {
    var query = " SELECT st_value((select rast from raster_data where id = 1), geom) as value "+
                " FROM (select (ST_PixelAsCentroids(rast)).* from raster_data where id = 1) as red "+
                " WHERE GeometryType(ST_Centroid(geom)) = 'POINT' "+
                " AND ST_Distance_Sphere( ST_Point(ST_X(ST_Centroid(geom)), ST_Y(ST_Centroid(geom))), "+
                " (ST_MakePoint("+req.params.longitude+", "+req.params.latitude+"))) <= 7.5 * 1609.34  ";
    sequelize.query(query, { 
      type:Sequelize.QueryTypes.SELECT}).then(function(data) {
        var result = {data: []};      
        result.data = data
        res.json(result)
    });
  },

  testeFunc(req, res) {
    var result = {value: []};
    result.value = functions.soma(10,25)
    res.json(result);
  },  

};

//longitude   -46.680484
//latitude    -23.647571