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

FlowRouter.route('/:category', {
  name: 'things.category.items',
  action() {
    BlazeLayout.render('App_body', { main: 'category_items' });
  },
});

FlowRouter.route('/:category/:item_id', {
  name: 'things.item.show',
  action() {
    BlazeLayout.render('App_body', { main: 'item_show' });
  },
});

FlowRouter.route('/:category/:item_id/book', {
  name: 'things.item.book',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', { main: 'item_book' });
  },
});
