import './my_things.html';

import { Things } from '/imports/api/things/things.js';

Template.my_things.onCreated(function() {
  this.autorun(() => {
    this.subscribe('my.things', Meteor.userId());
  });
});

Template.my_things.helpers({
  things() {
    return Things.find();
  }
});
