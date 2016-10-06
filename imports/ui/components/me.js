import './me.html';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';
import { Memberships } from '/imports/api/memberships/memberships.js';
import { Pools } from '/imports/api/pools/pools.js';

Template.me.helpers({
  newMessagesCount() {
    // TODO:
    return 3;
  },
  myThingsCount() {
    return Things.find( { owner: Meteor.userId() } ).count();
  },
  myDealsCount() {
    myThings = Things.find( { owner: Meteor.userId() } ).map((thing) => { return thing.slug });
    return myDeals = Deals.find( { $or: [
      { thing: { $in: myThings } },
      { borrower: Meteor.userId() }
    ] }).count();
  },
  memberships() {
    // TODO: take all active memberships
    return Memberships.find( { user: Meteor.userId(), active: true } );
  }
});

Template.me.events({
  'click .js-logout'(e, i) {
    Meteor.logout();
    FlowRouter.go('/');
  },
  'click .js-claim-membership'(e, i) {
    let orgNameInput = i.$('input[name="org_name"]')[0] || {};
    let secretInput = i.$('input[name="secret"]')[0] || {};
    Meteor.call(
      'claimMembership',
      orgNameInput.value,
      secretInput.value
    );
    orgNameInput.value = null;
    secretInput.value = null;
  }
});
