var Category = require('../api/category/categoryModel');
var Place = require('../api/place/placeModel');
var Event = require('../api/event/eventModel');
var User = require('../api/user/userModel');
var Comment = require('../api/comment/commentModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

var users = [
  { username: 'Sava', password: 'test' },
  { username: 'Ceca', password: 'test' },
];

var categories = [
  { name: 'club' },
  { name: 'bar' },
  { name: 'cafe' },
  { name: 'restaurant' },
  { name: 'movie' },
];

var createDoc = function (model, doc) {
  return new Promise(function (resolve, reject) {
    new model(doc).save(function (err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function () {
  logger.log('... cleaning the DB');
  var cleanPromises = [Place, Event, Comment]
    .map(function (model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
};

var createUsers = function (data) {
  var promises = users.map(function (user) {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(function (users) {
      return _.merge({ users: users }, data || {});
    });
};

var createCategories = function (data) {
  var promises = categories.map(function (category) {
    return createDoc(Category, category);
  });

  return Promise.all(promises)
    .then(function (categories) {
      return _.merge({ categories: categories }, data || {});
    });
};

cleanDB()
  .then(createUsers)
  .then(createCategories)
  .then(() => logger.log('... seeding DONE!'))
  .catch(logger.log.bind(logger));
