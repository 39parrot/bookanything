import '/imports/startup/server';

import { Meteor } from 'meteor/meteor';

S3.config = {
  key: Meteor.settings.AWS.accessKeyId,
  secret: Meteor.settings.AWS.secretAccessKey,
  bucket: 'ba-items',
  // region: 'eu-west-1' // Only needed if not "us-east-1" or "us-standard"
};

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

  if ( !!Meteor.settings.email ) {
    process.env.MAIL_URL = Meteor.settings.email.MAIL_URL;
  }
});

// if (Meteor.settings.AWS) {
//   AWS.config.update({
//     accessKeyId: Meteor.settings.AWS.accessKeyId,
//     secretAccessKey: Meteor.settings.AWS.secretAccessKey,
//   });
//   s3 = new AWS.S3();
//
//   s3.listBuckets(function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
//
//   var params = {Bucket: 'dk-bucket', Key: 'IMG_1365.jpg', Expires: 900};
//   s3.getSignedUrl('getObject', params, function (err, url) {
//     if (err) console.log(err, err.stack);    // an error occurred
//     else     console.log('The URL is', url); // successful response
//   });
// } else {
//   console.warn("AWS settings missing");
// }
