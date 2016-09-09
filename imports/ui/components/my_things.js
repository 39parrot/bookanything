import './my_things.html';

import { Things } from '/imports/api/things/things.js';

Template.my_things.helpers({
  things() {
    if ( !!Meteor.user ) {
      return Things.find( { owner: Meteor.userId() } );
    } else {
      return null;
    }
  }
});
