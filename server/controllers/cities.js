city = require('../models/').city;
state = require('../models/').state;

module.exports= {
  index(req, res) {
    city.findAll({
      include: state
    })
    .then(function (countries) {
      res.status(200).json(countries);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    city.findById(req.params.id, {
      include: state
    })
    .then(function (city) {
      res.status(200).json(city);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    city.create(req.body)
      .then(function (object) {
        res.status(200).json(object);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {    
    city.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    city.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
