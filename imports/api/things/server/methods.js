import { Deals } from '/imports/api/deals/deals.js';

Meteor.methods({
  "things.book"( thing_slug, from_string, to_string ) {
    if ( !Meteor.user() ) {
      throw new Meteor.Error("things.book.no_auth");
    }

    let now = moment();
    let from = moment(from_string, 'YYYY-MM-DD');
    let to = moment(to_string, 'YYYY-MM-DD');

    let bookingIntervalCorrect =
      from.isAfter(now) &&
      to.isAfter(now) &&
      from.isBefore(to);

    if ( !bookingIntervalCorrect ) {
      throw new Meteor.Error("things.book.invalid_dates");
    }

    let bookedIntervals = Deals.find( { thing: thing_slug, pickup_dt: { $gt: new Date() } } )
      .map((deal) => {
        return {
          slug: deal.slug,
          from: deal.pickup_dt,
          to: deal.return_dt
        }
      });
    let bookingIntervalOverlapsWithOther = _.some(bookedIntervals, (deal) => {
      return from.isBetween(deal.from, deal.to) || to.isBetween(deal.from, deal.to);
    });

    if ( bookingIntervalOverlapsWithOther ) {
      throw new Meteor.Error("things.book.not_avail_then");
    }

    let booking_dt = new Date();
    Deals.insert(
      {
        slug: _.random(100000, 999999).toString(),
        thing: thing_slug,
        booking_dt,
        pickup_dt: new Date(from_string),
        return_dt: new Date(to_string),
        borrower: Meteor.userId(),
      }
    );
  }
});
