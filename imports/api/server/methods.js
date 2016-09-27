Meteor.methods({
  sendStartSharingEmail: function (to, from, /*subject, text,*/ thing) {
    console.log(thing);
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
  }
});
