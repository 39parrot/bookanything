import './deal.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';
import { Events } from '/imports/api/events/events.js';

Template.deal.onCreated(function() {
  self = this;
  self.state = {
    deal: new ReactiveVar(),
    thing: new ReactiveVar(),
    canSendMessage: new ReactiveVar(false),
  }
  this.autorun(() => {
    self.state.deal.set(
      Deals.findOne( { slug: FlowRouter.getParam('deal') } )
    );
  });
  this.autorun(() => {
    if ( !!self.state.deal.get() ) {
      self.state.thing.set(
        Things.findOne( { slug: self.state.deal.get().thing } )
      )
    }
  });
});

Template.deal.helpers({
  deal() {
    return Template.instance().state.deal.get();
  },
  thing() {
    return Template.instance().state.thing.get();
  },
  events() {
    return Events.find(
      { deal: Template.instance().state.deal.get().slug },
      { sort: {dt: -1} }
    );
  },
  canSendMessage() {
    return Template.instance().state.canSendMessage.get();
  },
  eventBackgroundCss(event) {
    return event.seen.indexOf( Meteor.userId() ) != -1 ? "" : "background-color: lightgreen";
  }
});

Template.deal.events({
  // TODO: change it to "isElementInViewport"
  'click .js-event'(event, instance) {
    Events.update({ _id: this._id }, { $push: { seen: Meteor.userId() } });
  },
  'input .js-message'(event, instance) {
    if ( event.target.value.length > 0 ) {
      instance.state.canSendMessage.set(true);
    } else {
      instance.state.canSendMessage.set(false);
    }
  },
  'click .js-send'(event, instance) {
    event.preventDefault();

    instance.state.canSendMessage.set(false);
    text = instance.$('.js-message')[0].value;
    instance.$('.js-message')[0].value = '';

    Events.insert({
      deal: instance.state.deal.get().slug,
      dt: new Date(),
      type: "message",
      user: Meteor.userId(),
      content: {
        text
      },
      seen: [ Meteor.userId() ]
    });

    toastr.success("Message sent");
  }
});
