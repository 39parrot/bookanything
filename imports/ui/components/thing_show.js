import './thing_show.html';

import { Things } from '/imports/api/things/things.js';

Template.thing_show.onCreated(function() {

});

Template.thing_show.helpers({
  thing() {
    let thing = Things.findOne( { slug: FlowRouter.getParam('thing') } );
    // console.log(thing);
    return thing;
  },
});
