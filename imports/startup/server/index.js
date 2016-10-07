// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.js';

import './fixtures.js';

Meteor.startup(() => {
  SSR.compileTemplate('htmlEmailStartSharing', Assets.getText('html-email-start-sharing.html'));
  SSR.compileTemplate('htmlEmailNewMessage', Assets.getText('html-email-new-message.html'));
});

Accounts.onCreateUser((options, user) => {

  user.data = {};

  if ( user.services.facebook ) {
    user.data.profilePictureUrl = `http://graph.facebook.com/${user.services.facebook.id}/picture/?type=large`;
  } else if ( user.services.password ) {

  }

  // TODO: name is supposed to be unique!
  if ( user.services.facebook ) {
    user.data.name = user.services.facebook.name;
  } else if ( user.services.password ) {
    const email = user.emails[0].address;
    user.data.name = email.substr(0, email.indexOf('@'));
  }

  return user;
});
