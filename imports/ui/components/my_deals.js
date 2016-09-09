import './my_deals.html';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';

Template.my_deals.helpers({
  deals() {
    if ( !!Meteor.user() ) {
      // TODO: filter out only for MY deals here. All deals so far...
      return Deals.find( {  } );
    } else {
      console.warn('my.deals', 'no user');
      return null;
    }
  },
  dealThing(deal) {
    return Things.findOne( { slug: deal.thing } );
  }
});
