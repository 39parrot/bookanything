// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.js';

Meteor.startup(() => {
  SSR.compileTemplate('htmlEmailStartSharing', Assets.getText('html-email-start-sharing.html'));
  SSR.compileTemplate('htmlEmailNewMessage', Assets.getText('html-email-new-message.html'));
});
