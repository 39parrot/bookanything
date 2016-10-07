Template.registerHelper('userProfilePictureUrlByUserId', (userId) => {
  if ( !userId ) {
    return '/images/no-user.jpg';
  } else {
    const user = Meteor.users.findOne(userId);
    return user && user.data.profilePictureUrl ? user.data.profilePictureUrl : '/images/no-user.jpg';
  }
});

Template.registerHelper('loggedInUserProfilePictureUrl', () => {
  if ( !Meteor.user() ) {
    return '/images/no-user.jpg';
  } else {
    const user = Meteor.user();
    return user && user.data && user.data.profilePictureUrl ? user.data.profilePictureUrl : '/images/no-user.jpg';
  }
});

Template.registerHelper('userNameByUserId', (userId) => {
  if ( !userId ) {
    return null;
  } else {
    return Meteor.users.findOne(userId).data.name;
  }
});

Template.registerHelper('loggedInUserName', (userId) => {
  if (!Meteor.user()) {
    return null;
  } else {
    const user = Meteor.user();
    return user && user.data && user.data.name ? user.data.name : null;
  }
});

Template.registerHelper('thingImageUrl', (thing) => {
  return thing && thing.image && thing.image.url ? thing.image.url : "/images/no_image.png";
});
