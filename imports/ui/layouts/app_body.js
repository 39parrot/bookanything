import './app_body.html';

import '/imports/ui/components/messagesCountIndicator.js';

Template.App_body.onCreated(function() {
  this.autorun(() => {
    this.subscribe('Meteor.users.data', { userIds: [Meteor.userId()] });
  });
});

Template.App_body.helpers({
  loggedIn() {
    return !!Meteor.user();
  },
  breadcrumbText() {
    return FlowRouter.current().route.options.breadcrumbText;
  }
});
