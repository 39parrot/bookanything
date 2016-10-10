import './deal.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';
import { Events } from '/imports/api/events/events.js';

Template.deal.onCreated(function() {
  this.autorun(() => {
    this.subscribe('deal.thing.events', FlowRouter.getParam('deal'), Meteor.userId());
  });

  this.state = new ReactiveDict('state');
  this.state.set('canSendMessage', false);
});

Template.deal.helpers({
  deal() {
    return Deals.findOne();
  },
  thing() {
    return Things.findOne();
  },
  events() {
    return Events.find( {}, { sort: {dt: -1} } );
  },
  canSendMessage() {
    return Template.instance().state.get('canSendMessage');
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
      instance.state.set('canSendMessage', true);
    } else {
      instance.state.set('canSendMessage', false);
    }
  },
  'click .js-send'(event, instance) {
    event.preventDefault();

    instance.state.set('canSendMessage', false);
    text = instance.$('.js-message')[0].value;
    instance.$('.js-message')[0].value = '';

    let msg = {
      slug: _.random(100000, 999999).toString(),
      deal: FlowRouter.getParam('deal'),
      dt: new Date(),
      type: "message",
      user: Meteor.userId(),
      content: {
        text
      },
      seen: [ Meteor.userId() ]
    }
    Events.insert( msg );

    Meteor.call('sendNewMessageEmail',
      FlowRouter.getParam('deal'),
      Events.findOne( { slug: msg.slug } )
    );

    toastr.success("Message sent");
  }
});
