import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '/imports/ui/layouts/app_body.js';
import '/imports/ui/components/categories.js';
import '/imports/ui/components/share_form.js';
import '/imports/ui/components/category_items.js';
import '/imports/ui/components/item_show.js';
import '/imports/ui/components/private.js';

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

FlowRouter.route('/share', {
  name: 'share.form',
  action() {
    BlazeLayout.render('App_body', { main: 'share_form' });
  },
});

FlowRouter.route('/private', {
  name: "private",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: "private" });
  }
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
