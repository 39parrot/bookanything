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
  sendNewMessageEmail: function (deal, thing, message) {
    this.unblock();
    Email.send({
      to: Meteor.users.findOne( { _id: thing.owner } ).services.facebook.email,
      from: 'BookAnything <noreply@bookanything.com>',
      subject: 'New message',
      html: SSR.render('htmlEmailNewMessage', {
        siteUri: Meteor.settings.siteUri,
        deal: deal,
        thing: thing,
      })
    });
  }
});
