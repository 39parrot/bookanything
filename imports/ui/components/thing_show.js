import './thing_show.html';

import { Things } from '/imports/api/things/things.js';

Template.thing_show.onCreated(function() {
  this.getThingSlug = () => FlowRouter.getParam('thing');
  this.autorun(() => {
    this.subscribe('things', this.getThingSlug());
  });
});

Template.thing_show.helpers({
  thing() {
    return Things.findOne( { slug: FlowRouter.getParam('thing') } );
  },
});
