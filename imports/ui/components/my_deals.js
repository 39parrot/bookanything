import './my_deals.html';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';
import { Events } from '/imports/api/events/events.js';

Template.my_deals.helpers({
  deals() {
    if ( !!Meteor.user() ) {
      myThings = Things.find( { owner: Meteor.userId() } ).map((thing) => { return thing.slug });
      myDeals = Deals.find(
        { $or: [
            { thing: { $in: myThings } },
            { borrower: Meteor.userId() }
          ]
        }
      )
      .map( (deal) => { return deal.slug; } );
      if ( !!FlowRouter.getQueryParam('withNewMessagesOnly') ) {
        myDealsWithNewMessages = Events.find( { deal: { $in: myDeals }, seen: { $not: Meteor.userId() } } )
          .map( (event) => { return event.deal; } );
        return Deals.find(
          { slug: { $in: myDealsWithNewMessages } },
          { sort: {booking_dt: -1} }
        );
      } else {
        return Deals.find(
          { slug: { $in: myDeals } },
          { sort: {booking_dt: -1} }
        );
      }
    } else {
      console.warn('my.deals', 'no user');
      return null;
    }
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
