Template.registerHelper('userProfilePictureUrlByUserId', (userId) => {
  if ( !userId ) {
    console.warn('userProfilePictureUrlByUserId', 'userId', userId);
    return null;
  } else {
    return `http://graph.facebook.com/${ Meteor.users.findOne( {_id: userId} ).services.facebook.id }/picture/?type=large`;
  }
});

Template.registerHelper('userNameByUserId', (userId) => {
  return Meteor.users.findOne( { _id: userId } ).profile.name;
});

Template.registerHelper('thingImageUrl', (thing) => {
  return thing && thing.image && thing.image.url ? thing.image.url : "/images/no_image.png";
});
