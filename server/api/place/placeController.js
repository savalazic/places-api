var Place = require('./placeModel');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
  Place.findById(id)
    .populate('category', 'name')
    .exec()
    .then(function (place) {
      if (!place) {
        next(new Error('No place with that id'));
      } else {
        req.place = place;
        next();
      }
    }, function (err) {
      next(err);
    });
};

exports.get = function (req, res, next) {
  Place.find({})
    .populate('category')
    .exec()
    .then(function (places) {
      res.json(places);
    }, function (err) {
      next(err);
    });
};

exports.getOne = function (req, res, next) {
  var place = req.place;
  res.json(place);
};

exports.put = function (req, res, next) {
  var place = req.place;

  var update = req.body;

  _.merge(place, update);

  place.save(function (err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function (req, res, next) {
  var newPlace = req.body;

  Place.create(newPlace)
    .then(function (place) {
      res.json(place);
    }, function (err) {
      next(err);
    });
};

exports.delete = function (req, res, next) {
  req.place.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
