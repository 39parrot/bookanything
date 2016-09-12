import './app_body.html';

import '/imports/ui/components/messagesCountIndicator.js';

Template.App_body.helpers({
  loggedIn() {
    return !!Meteor.user();
  },
  breadcrumbText() {
    return FlowRouter.current().route.options.breadcrumbText;
  }
});
