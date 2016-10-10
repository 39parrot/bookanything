import './thing_show.html';

import { Things } from '/imports/api/things/things.js';

Template.thing_show.onCreated(function() {
  this.state = new ReactiveDict('state');

  this.getThingSlug = () => FlowRouter.getParam('thing');
  this.autorun(() => {
    console.log('hi');
    this.subscribe('things', this.getThingSlug());
  });
  this.autorun(() => {
    console.log('hey');
    const thing = Things.findOne({ slug: this.getThingSlug() }) || {};
    this.state.set('thing', thing);
    this.subscribe('Meteor.users.data', { userIds: [thing.owner] })
  });
});

Template.thing_show.helpers({
  thing() {
    console.log('thing()');
    return Template.instance().state.get('thing');
  },
});
