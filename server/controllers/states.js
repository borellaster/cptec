state = require('../models/').state;
country = require('../models/').country;

var db = require('../models/index');

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    state.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     include: {all: true} 
                     }).then(function (states) {
                      
      result.data = states;
      db.sequelize.query("select count(id) from \"states\" " , { 
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
    state.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     where: {name: {$iLike: '%'+name+'%'}},
                     include: {all: true}
                     }).then(function (states) {
                      
      result.data = states;
      db.sequelize.query("select count(id) from \"states\"  "+where , { 
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
    db.sequelize.query("select id, name from \"states\" order by name ", { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(states) {
        result.data = states;  
        res.status(200).json(result);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },     

  findById(req, res) {
    state.findById(req.params.id, {include: {all: true}}).then(function (state) {
      res.status(200).json(state);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  save(req, res) {
    state.create(req.body).then(function (object) {
        res.status(200).json(object);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {    
    state.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(req.body);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    state.destroy({where: {id: req.params.id}}).then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }


};

/*Documentacao*/
/**
 * @api {get} /states Find all
 * @apiGroup States
 * @apiSuccess {Object[]} State list
 * @apiSuccess {Number} state.id id
 * @apiSuccess {String} state.name name
 * @apiSuccess {String} state.nickname nickname
 * @apiSuccess {Number} state.longitude longitude
 * @apiSuccess {Number} state.latitude latitude
 * @apiSuccess {Date} state.updated_at Last update
 * @apiSuccess {Date} state.created_at Register date
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
 * @api {get} /states/:id Find a state
 * @apiGroup States
 * @apiParam {id} id State id
 * @apiSuccess {Number} state.id id
 * @apiSuccess {String} state.name name
 * @apiSuccess {String} state.nickname nickname
 * @apiSuccess {Number} state.longitude longitude
 * @apiSuccess {Number} state.latitude latitude
 * @apiSuccess {Date} state.updated_at Last update
 * @apiSuccess {Date} state.created_at Register date
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
 * @apiErrorExample {json} State not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

 /**
 * @api {post} /states Register a new state
 * @apiGroup States
 * @apiParamExample {json} Input
 *    {
 *      "name": "Brasil",
 *      "nickname": "BR",
 *      "longitude": -50,
 *      "latitude": -60
 *    }
 * @apiSuccess {Number} state.id id
 * @apiSuccess {String} state.name name
 * @apiSuccess {String} state.nickname nickname
 * @apiSuccess {Number} state.longitude longitude
 * @apiSuccess {Number} state.latitude latitude
 * @apiSuccess {Date} state.updated_at Last update
 * @apiSuccess {Date} state.created_at Register date
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
 * @api {put} /states/:id Update a state
 * @apiGroup States
 * @apiParam {Number} state.id id
 * @apiParam {String} state.name name
 * @apiParam {String} state.nickname nickname
 * @apiParam {Number} state.longitude longitude
 * @apiParam {Number} state.latitude latitude
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
 * @api {delete} /states/:id Remove a state
 * @apiGroup States
 * @apiParam {id} id State id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */


