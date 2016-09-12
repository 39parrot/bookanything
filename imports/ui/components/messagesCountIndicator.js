import './messagesCountIndicator.html';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';
import { Events } from '/imports/api/events/events.js';

Template.messagesCountIndicator.helpers({
  newMessagesCount() {
    myThings = Things.find( { owner: Meteor.userId() } ).map((thing) => { return thing.slug });
    myDeals = Deals.find( { $or: [
      { thing: { $in: myThings } },
      { borrower: Meteor.userId() }
    ] }).map( (deal) => { return deal.slug; } );
    return Events.find( { deal: { $in: myDeals } , seen: { $not: Meteor.userId() } } ).count();
  }
});
