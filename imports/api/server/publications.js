import { CategoryCatalogs } from '/imports/api/categories/categories.js';

Meteor.publish('Meteor.users.data', function({ userIds }) {

  const selector = {
    _id: { $in: userIds }
  }

  const options = {
    fields: { data: 1 }
  }

  return Meteor.users.find(selector, options);
});
