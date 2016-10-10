import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';

Meteor.publish('my.deals', function(withNewMessagesOnly) {
  if ( !this.userId ) {
    return null;
  }

  let dealsCursor;
  {
    // things that I am an owner of
    const myThings = Things.find( { owner: this.userId } ).map((thing) => { return thing.slug });
    // deals for the things I am either an owner of or borrower of
    const myDeals = Deals.find(
      { $or: [
          { thing: { $in: myThings } },
          { borrower: this.userId }
        ]
      }
    )
    .map( (deal) => { return deal.slug; } );
    if ( withNewMessagesOnly ) {
      myDealsWithNewMessages = Events.find( { deal: { $in: myDeals }, seen: { $not: this.userId } } )
        .map( (event) => { return event.deal; } );
      dealsCursor = Deals.find(
        { slug: { $in: myDealsWithNewMessages } },
        { sort: {booking_dt: -1} }
      );
    } else {
      dealsCursor = Deals.find(
        { slug: { $in: myDeals } },
        { sort: {booking_dt: -1} }
      );
    }
  }
  let thingsCursor;
  {
    const thingSlugs = dealsCursor.map((d) => { return d.thing; });
    thingsCursor = Things.find( { slug: { $in: thingSlugs } } );
  }
  return [
    dealsCursor,
    thingsCursor
  ]
});
