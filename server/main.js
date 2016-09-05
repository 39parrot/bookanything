import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  ServiceConfiguration.configurations.upsert({
    service: "facebook"
  }, {
    $set: {
      appId: Meteor.settings.facebook.appId,
      loginStyle: "popup",
      secret: Meteor.settings.facebook.secret
    }
  });
});
