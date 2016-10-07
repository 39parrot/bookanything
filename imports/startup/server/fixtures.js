import { CategoryCatalogs } from '/imports/api/categories/categories.js';

Meteor.startup(() => {
  if (CategoryCatalogs.find().count() === 0) {
    CategoryCatalogs.insert({
      "categories" : [
    		{
    			"name" : "cars",
    			"displayName" : "Cars",
    			"image" : {
    				"url" : "/images/categories/category-wide.jpg",
    				"wide" : true
    			}
    		},
    		{
    			"name" : "bicycles",
    			"displayName" : "Bicycles",
    			"image" : {
    				"url" : "/images/categories/category.jpg"
    			}
    		},
    		{
    			"name" : "flats",
    			"displayName" : "Flats",
    			"image" : {
    				"url" : "/images/categories/flats.jpg"
    			}
    		}
    	]
    });
  }
});

// DB MIGRATIONS

// custom users' data
// db.users.update({}, { $set: { data: {} }}, { multi: true });

// user.data.profilePictureUrl = facebook's picture
// db.users.find({"services.facebook": { $exists: true }}).forEach(function(doc) {
//  doc.data = { profilePictureUrl: "http://graph.facebook.com/" + doc.services.facebook.id + "/picture/?type=large" };
//  db.users.save(doc);
// });
// user.data.name
// db.users.find().forEach(function(doc) {
//   if (doc.services.facebook) {
//     doc.data.name = doc.services.facebook.name;
//   } else if (doc.services.password) {
//     const email = doc.emails[0].address;
//     doc.data.name = email.substr(0, email.indexOf('@'));
//   }
//   db.users.save(doc);
// });
