import { Pools } from '/imports/api/pools/pools.js';
import { Memberships } from '/imports/api/memberships/memberships.js';

Meteor.methods({
  claimMembership: function(poolOwnerName, secret) {
    if ( !!poolOwnerName && !!secret ) {
      let poolOwnerAccount = Meteor.users.findOne( { name: poolOwnerName } ) || {};
      Pools.find( { owner: poolOwnerAccount._id, secret: secret } )
        .forEach((p) => {
          if ( Memberships.findOne() ) {

          }
          Memberships.insert({
            user: Meteor.userId(),
            hash: p.hash,
            pool: {
              name: `${poolOwnerName}/${p.name}`
            },
            active: true
          })
        });
    }
  }
});
