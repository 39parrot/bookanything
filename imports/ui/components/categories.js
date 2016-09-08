import './categories.html';

import { CategoryCatalog } from '/imports/api/categories/categories.js';

Template.categories.onCreated(function() {
  // this.subscribe('categories');
});

Template.categories.helpers({
  categories() {
    catalog = CategoryCatalog.findOne();
    return catalog ? catalog.categories : null;
  },
  classWide(cat) {
    return cat.image.wide ? 'wide' : null;
  }
});
