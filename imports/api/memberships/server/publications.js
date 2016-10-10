import { Memberships } from '/imports/api/memberships/memberships.js';

Meteor.publish('my.memberships', function() {
  return Memberships.find( { user: this.userId, active: true } );
});
