import './deal.html';

import { FlowRouter } from 'meteor/kadira:flow-router';

import { Deals } from '/imports/api/deals/deals.js';
import { Things } from '/imports/api/things/things.js';

Template.deal.onCreated(function() {
  self = this;
  self.state = {
    deal: new ReactiveVar(),
    thing: new ReactiveVar(),
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
});
