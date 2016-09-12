import './me.html';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';

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
  }
});
