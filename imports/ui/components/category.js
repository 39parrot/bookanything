import './category.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

import { CategoryCatalogs } from '/imports/api/categories/categories.js';
import { Things } from '/imports/api/things/things.js';

Template.category.onCreated(function() {
  this.getCategory = () => FlowRouter.getParam('category');
  this.subscribe('catalog.latest');
  this.autorun(() => {
    this.subscribe('things.inCategory', this.getCategory());
  });
});

Template.category.helpers({
  category() {
    catalog = CategoryCatalogs.findOne();
    return catalog ? _.findWhere( catalog.categories, { name: FlowRouter.getParam('category') } ) : null;
  },
  things() {
    return Things.find();
  },
});
