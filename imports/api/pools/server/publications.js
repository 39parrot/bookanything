import { Pools } from '/imports/api/pools/pools.js';

Meteor.publish('my.pools', function() {
  return Pools.find( { owner: this.userId } );
});
