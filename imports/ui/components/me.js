import './me.html';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';
import { Memberships } from '/imports/api/memberships/memberships.js';
import { Pools } from '/imports/api/pools/pools.js';

Template.me.onCreated(function() {
  this.autorun(() => {
    this.subscribe('Meteor.users.data', { userIds: !!Meteor.user() ? [Meteor.user()._id] : [] });
    this.subscribe('my.things', Meteor.userId());
    this.subscribe('my.deals', false, Meteor.userId());
    this.subscribe('my.memberships', Meteor.userId());
  });
});

Template.me.helpers({
  newMessagesCount() {
    // TODO:
    return 3;
  },
  myThingsCount() {
    return Things.find().count();
  },
  myDealsCount() {
    return Deals.find().count();
  },
  memberships() {
    return Memberships.find();
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
