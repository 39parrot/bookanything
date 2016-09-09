import './app_body.html';

Template.App_body.helpers({
  loggedIn() {
    return !!Meteor.user();
  },
  loggedInUserProfilePictureUrl() {
    return `http://graph.facebook.com/${Meteor.user().services.facebook.id}/picture/?type=large`;
  },
});
