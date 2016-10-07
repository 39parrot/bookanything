import { CategoryCatalogs } from '/imports/api/categories/categories.js';

Meteor.publish('catalog.latest', function latestCatalog() {
  // TODO: look for the latest one really (there is no timestamp field in the document so far though)
  return CategoryCatalogs.find({}, {limit:1});
});
