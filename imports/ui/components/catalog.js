import './catalog.html';

import { CategoryCatalogs } from '/imports/api/categories/categories.js';

Template.catalog.onCreated(function() {
  this.subscribe('catalog.latest');
});

Template.catalog.helpers({
  categories() {
    const catalog = CategoryCatalogs.findOne() || {};
    return catalog.categories;
  },
  classWide(cat) {
    return cat.image.wide ? 'wide' : null;
  }
});
