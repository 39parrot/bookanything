import './category_items.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

import { CategoryCatalog } from '/imports/api/categories/categories.js';
import { Things } from '/imports/api/things/things.js';

Template.category_items.onCreated(function() {
  // this.autorun(() => {
  //   console.log( Things.find({}).count() );
  // });
});

Template.category_items.helpers({
  category() {
    catalog = CategoryCatalog.findOne();
    return catalog ? _.findWhere( catalog.categories, { name: FlowRouter.getParam('category') } ) : null;
  },
  things() {
    // TODO: limit collection
    // TODO: make infinite scroll
    return Things.find( { category: FlowRouter.getParam('category') } );
  },
});
