import './item_show.html';

import { Things } from '/imports/api/things/things.js';

Template.item_show.onCreated(function() {
  // console.log( FlowRouter );
});

Template.item_show.helpers({
  thing() {
    return {
      slug: "123456",
      name: "Audi A3",
      address: "Sankt Eriksgatan 117, Business Center Bilpalatset",
      price: 520,
      price_period: "w",
      category: "cars",
      owner: "cqMYAwyM36CCKyxu7"
    }
    // return Things.find( { slug: FlowRouter.getParam('thing') } );
  },
  thingImageUrl(thing) {
    return thing.image && thing.image.url ? thing.image.url : "/images/no_image.png";
  },

  userName(userId) {
    return Meteor.users.findOne( { _id: userId } ).profile.name;
  },
  userProfilePictureUrl(userId) {
    return `http://graph.facebook.com/${ Meteor.users.findOne( {_id: userId} ).services.facebook.id }/picture/?type=large`;
  },
});
