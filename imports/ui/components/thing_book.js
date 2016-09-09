import './thing_book.html';

import { Deals } from '/imports/api/deals/deals.js';
import { Events } from '/imports/api/events/events.js';

Template.thing_book.onCreated(function() {
  this.state = {
    processing: new ReactiveVar(),
  }
  this.state.processing.set(false);

  Meteor.setTimeout(() => {
    if (!this.state.processing.get()) this.state.processing.set(true);
  }, 200);

  booking_dt = new Date();
  Deals.insert(
    {
      slug: _.random(100000, 999999).toString(),
      thing: FlowRouter.getParam('thing'),
      // TODO: should be done on the server
      booking_dt,
      pickup_dt: new Date(),
      return_dt: new Date(),
      borrower: Meteor.userId(),
    },
    (err, _id) => {

      this.state.processing.set(false);
      if (err) {
        toastr.error("Couldn't book", "Please try again");
      } else {
        toastr.success('Booked!');
        deal = Deals.findOne( { _id } );
        Meteor.setTimeout(() => {
          FlowRouter.go('/deals/:deal', { deal: deal.slug });
        }, 2000);
        Events.insert({
          deal: deal.slug,
          dt: booking_dt,
          type: "booking",
          user: Meteor.userId(),
          content: {
            text: "booked"
          },
          seen: {
            [Meteor.userId()]: true
          }
        });
      }
    }
  );
});

Template.thing_book.helpers({
  processing() {
    return Template.instance().state.processing.get();
  }
});
