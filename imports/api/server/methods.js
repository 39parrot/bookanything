Meteor.methods({
  sendStartSharingEmail: function (to, from, /*subject, text,*/ thing) {
    // check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: `You start sharing ${thing.name}`,
      html: SSR.render('htmlEmailStartSharing', {
        siteUri: Meteor.settings.siteUri,
        thing: thing
      })
    });
  },
  sendNewMessageEmail: function (dealSlug, message) {
    this.unblock();

    const deal = Deals.findOne( { slug: dealSlug } );
    const thing = Things.findOne( { slug: deal.thing } );
    // if logged in user is the owner
    //    it's the owner sending message to the borrower
    // if logged in user is the borrower
    //    it's the borrower sending message to the owner
    let receiver = ( thing.owner === Meteor.userId() ? deal.borrower : thing.owner );
    Email.send({
      to: Meteor.users.findOne( { _id: receiver } ).services.facebook.email,
      from: 'BookAnything <noreply@bookanything.com>',
      subject: 'New message',
      html: SSR.render('htmlEmailNewMessage', {
        siteUri: Meteor.settings.siteUri,
        deal: deal,
        thing: thing,
        msg: message
      })
    });
  }
});
