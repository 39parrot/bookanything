import './item_book.html';

import { Deals } from '/imports/api/deals/deals.js';

Template.item_book.onCreated(function() {
  this.state = {
    processing: new ReactiveVar(),
  }
  this.state.processing.set(false);

  Meteor.setTimeout(() => {
    if (!this.state.processing.get()) this.state.processing.set(true);
  }, 200);

  Deals.insert(
    {
      slug: _.random(100000, 999999).toString(),
      thing: FlowRouter.getParam('thing'),
      booking_date: new Date(),
    },
    (err, _id) => {
      toastr.success('Booked!');
      this.state.processing.set(false);
      if (err) {

      } else {
        Meteor.setTimeout(() => {
          FlowRouter.go('/deals/:deal', { deal: Deals.findOne( { _id } ).slug });
        }, 2000);
      }
    }
  )
});

Template.item_book.helpers({
  processing() {
    return Template.instance().state.processing.get();
  }
});
