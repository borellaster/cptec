state = require('../models/').state;
country = require('../models/').country;

module.exports= {
  index(req, res) {
    state.findAll({
      include: country
    })
    .then(function (countries) {
      res.status(200).json(countries);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    state.findById(req.params.id, {
      include: country
    })
    .then(function (state) {
      res.status(200).json(state);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    state.create(req.body)
      .then(function (object) {
        res.status(200).json(object);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {    
    state.update(req.body, {
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
    state.destroy({
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
