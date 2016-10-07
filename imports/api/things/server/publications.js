import { Things } from '/imports/api/things/things.js';
import { Memberships } from '/imports/api/memberships/memberships.js';

Meteor.publish('things.inCategory', function thingsInCategory(category) {
  const membershipHashes = Memberships.find( { user: this.userId, active: true } )
    .map((m) => {
      return m.hash;
    });
  return Things.find({
    "$and": [
      { category: category },
      { "$or": [
        { owner: this.userId },
        { "privacy.private": false },
        { "privacy.hash": { $in: membershipHashes } }
      ]}
    ]
  }, {fields: Things.publicProjection});
});
