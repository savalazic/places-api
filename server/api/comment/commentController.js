var Comment = require('./commentModel');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
  Comment.findById(id)
    .populate('user')
    .exec()
    .then(function (comment) {
      if (!comment) {
        next(new Error('No comment with that id'));
      } else {
        req.comment = comment;
        next();
      }
    }, function (err) {
      next(err);
    });
};

exports.get = function (req, res, next) {
  Comment.find({})
    .populate('user')
    .exec()
    .then(function (comments) {
      res.json(comments);
    }, function (err) {
      next(err);
    });
};

exports.getOne = function (req, res, next) {
  var comment = req.comment;
  res.json(comment);
};

exports.put = function (req, res, next) {
  var comment = req.comment;

  var update = req.body;

  _.merge(comment, update);

  comment.save(function (err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function (req, res, next) {
  var newComment = req.body;

  Comment.create(newComment)
    .then(function (comment) {
      res.json(comment);
    }, function (err) {
      next(err);
    });
};

exports.delete = function (req, res, next) {
  req.comment.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
