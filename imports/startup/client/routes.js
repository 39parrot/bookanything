import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '/imports/ui/layouts/app_body.js';
import '/imports/ui/components/categories.js';
import '/imports/ui/components/share_form.js';
import '/imports/ui/components/category_items.js';
import '/imports/ui/components/item_show.js';
import '/imports/ui/components/item_book.js';
import '/imports/ui/components/my_history.js';
import '/imports/ui/components/deal.js';
import '/imports/ui/components/me.js';
import '/imports/ui/components/my_deals.js';
import '/imports/ui/components/my_things.js';

// AccountsTemplates.configureRoute('changePwd');
// AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
});
// AccountsTemplates.configureRoute('signUp');
// AccountsTemplates.configureRoute('verifyEmail');


FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'categories' });
  },
});

FlowRouter.route('/history', {
  name: 'my.history',
  action() {
    BlazeLayout.render('App_body', { main: 'my_history' });
  },
});


FlowRouter.route('/share', {
  name: 'share.form',
  action() {
    BlazeLayout.render('App_body', { main: 'share_form' });
  },
});

FlowRouter.route('/me', {
  name: 'me',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', { main: 'me' });
  },
});

FlowRouter.route('/my/deals', {
  name: 'my.deals',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', { main: 'my_deals' });
  },
});

FlowRouter.route('/my/things', {
  name: 'my.things',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', { main: 'my_things' });
  },
});

FlowRouter.route('/deals/:deal', {
  name: 'deals.deal',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', { main: 'deal' });
  },
});

FlowRouter.route('/:category', {
  name: 'things.category.items',
  action() {
    BlazeLayout.render('App_body', { main: 'category_items' });
  },
});

FlowRouter.route('/:category/:thing', {
  name: 'things.item.show',
  action() {
    BlazeLayout.render('App_body', { main: 'item_show' });
  },
});

FlowRouter.route('/:category/:thing/book', {
  name: 'things.item.book',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', { main: 'item_book' });
  },
});
