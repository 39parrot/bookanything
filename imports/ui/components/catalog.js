import './catalog.html';

import { CategoryCatalog } from '/imports/api/categories/categories.js';

Template.catalog.onCreated(function() {
  // this.subscribe('categories');
});

Template.catalog.helpers({
  categories() {
    catalog = CategoryCatalog.findOne();
    return catalog ? catalog.categories : null;
  },
  classWide(cat) {
    return cat.image.wide ? 'wide' : null;
  }
});
