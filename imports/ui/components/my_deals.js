import './my_deals.html';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';
import { Events } from '/imports/api/events/events.js';

Template.my_deals.onCreated(function() {
  this.autorun(() => {
    this.subscribe('my.deals', FlowRouter.getQueryParam('withNewMessagesOnly'), Meteor.user());
  });
});

Template.my_deals.helpers({
  deals() {
    return Deals.find();
  },
  dealThing(deal) {
    return Things.findOne( { slug: deal.thing } );
  },
  firstNewMessage() {
    return "asdfasf...";
  },
  newMessagesCount(deal) {
    return Events.find( { deal: deal.slug, seen: { $not: Meteor.userId() } } ).count();
  }
});
