import './app_body.html';

import '/imports/ui/components/messagesCountIndicator.js';

Template.App_body.helpers({
  loggedIn() {
    return !!Meteor.user();
  },
  loggedInUserProfilePictureUrl() {
    return `http://graph.facebook.com/${Meteor.user().services.facebook.id}/picture/?type=large`;
  },
  breadcrumbText() {
    return FlowRouter.current().route.options.breadcrumbText;
  }
});
