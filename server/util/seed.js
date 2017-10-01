var Category = require('../api/category/categoryModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

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
  var cleanPromises = [Category]
    .map(function (model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

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
  .then(createCategories)
  .then(() => logger.log('... seeding DONE!'))
  .catch(logger.log.bind(logger));
