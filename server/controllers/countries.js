country = require('../models/').country;
var db = require('../models/index');

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    country.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name'
                     }).then(function (countries) {
                      
      result.data = countries;
      db.sequelize.query("select count(id) from \"countries\" " , { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(count) {
        result.count = parseInt(count[0].count);
        result.page = parseInt(req.params.page);
        result.pages = parseInt(Math.ceil(result.count / req.params.size));  
        res.status(200).json(result);
      });      
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  search(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    var name="%", where="";
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    if(req.params.name != undefined){
      name = req.params.name;
      where = " where name ilike '%"+name+"%' "; 
    }
    country.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     where: {name: {$iLike: '%'+name+'%'}}
                     }).then(function (countries) {
                      
      result.data = countries;
      db.sequelize.query("select count(id) from \"countries\"  "+where , { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(count) {
        result.count = parseInt(count[0].count);
        result.page = parseInt(req.params.page);
        result.pages = parseInt(Math.ceil(result.count / req.params.size));  
        res.status(200).json(result);
      });      
    }).catch(function (error) {
      res.status(500).json(error);
    });
  }, 

  combo(req, res) {
    var result = {data: []};
    db.sequelize.query("select id, name from \"countries\" order by name ", { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(countries) {
        result.data = countries;  
        res.status(200).json(result);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },   

  findById(req, res) {
    country.findById(req.params.id).then(function (country) {
      res.status(200).json(country);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  save(req, res) {
    country.create(req.body).then(function (object) {
      res.status(200).json(object);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {    
    country.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(req.body);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    country.destroy({where: {id: req.params.id}}).then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }

};


/*Documentacao*/
/**
 * @api {get} /countries Find all
 * @apiGroup Countries
 * @apiSuccess {Object[]} Country list
 * @apiSuccess {Number} country.id id
 * @apiSuccess {String} country.name name
 * @apiSuccess {String} country.nickname nickname
 * @apiSuccess {Number} country.longitude longitude
 * @apiSuccess {Number} country.latitude latitude
 * @apiSuccess {Date} country.updated_at Last update
 * @apiSuccess {Date} country.created_at Register date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "name": "Brasil",
 *      "nickname": "BR",
 *      "longitude": -50,
 *      "latitude": -60,
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

 /**
 * @api {get} /countries/:id Find a country
 * @apiGroup Countries
 * @apiParam {id} id Country id
 * @apiSuccess {Number} country.id id
 * @apiSuccess {String} country.name name
 * @apiSuccess {String} country.nickname nickname
 * @apiSuccess {Number} country.longitude longitude
 * @apiSuccess {Number} country.latitude latitude
 * @apiSuccess {Date} country.updated_at Last update
 * @apiSuccess {Date} country.created_at Register date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Brasil",
 *      "nickname": "BR",
 *      "longitude": -50,
 *      "latitude": -60,
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }
 * @apiErrorExample {json} Country not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

 /**
 * @api {post} /countries Register a new country
 * @apiGroup Countries
 * @apiParamExample {json} Input
 *    {
 *      "name": "Brasil",
 *      "nickname": "BR",
 *      "longitude": -50,
 *      "latitude": -60
 *    }
 * @apiSuccess {Number} country.id id
 * @apiSuccess {String} country.name name
 * @apiSuccess {String} country.nickname nickname
 * @apiSuccess {Number} country.longitude longitude
 * @apiSuccess {Number} country.latitude latitude
 * @apiSuccess {Date} country.updated_at Last update
 * @apiSuccess {Date} country.created_at Register date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Brasil",
 *      "nickname": "BR",
 *      "longitude": -50,
 *      "latitude": -60,
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

/**
 * @api {put} /countries/:id Update a country
 * @apiGroup Countries
 * @apiParam {Number} country.id id
 * @apiParam {String} country.name name
 * @apiParam {String} country.nickname nickname
 * @apiParam {Number} country.longitude longitude
 * @apiParam {Number} country.latitude latitude
 * @apiParamExample {json} Input
 *    {
 *      "name": "Brasil",
 *      "nickname": "BR",
 *      "longitude": -50,
 *      "latitude": -60
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */


/**
 * @api {delete} /countries/:id Remove a country
 * @apiGroup Countries
 * @apiParam {id} id Country id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */