import './share_form.html';

import { Things } from '/imports/api/things/things.js';
import { Pools } from '/imports/api/pools/pools.js';

Template.share_form.onCreated(function() {
  this.state = {
    processing: new ReactiveVar(false),
    saved: new ReactiveVar(false),
    thing: null,
  }
});

Template.share_form.helpers({
  processing() {
    return Template.instance().state.processing.get();
  },
  saved() {
    return Template.instance().state.saved.get();
  },
  thing() {
    return Template.instance().state.thing;
  },
  pathToThing(thing) {
    return `/things/${thing.slug}`;
  },
  pools() {
    return Pools.find( { owner: Meteor.userId() } );
  }
});

Template.share_form.events({
  // 'change input[name=pool]'(event, instance) {
  //   console.log( instance.$('input[name="pool"]:checked')[0].value );
  // },
  'click .js-save'(event, instance) {
    event.preventDefault();

    instance.state.processing.set(true);
    freezeTheForm(instance);

    instance.$('.js-save')[0].disabled = true;
    let categoryInput = instance.$('select#category')[0];
    // categoryInput.disabled = true;
    let whatInput = instance.$('input#what')[0];
    // whatInput.disabled = true;
    let whereInput = instance.$('input#where')[0];
    // whereInput.disabled = true;
    let descriptionInput = instance.$('input#description')[0];
    // descriptionInput.disabled = true;
    let priceInput = instance.$('input#price')[0];
    // priceInput.disabled = true;

    console.log('saving...');
    // console.log(instance.myDropzone.files[0]);

    let thing = {
      slug: _.random(100000, 999999).toString(),
      name: whatInput.value,
      address: whereInput.value,
      description: descriptionInput.value,
      price: priceInput.value,
      price_period: "w", // TODO:
      category: categoryInput.value,
      owner: Meteor.userId(),
    }
    if ( !isThingValid(thing) ) {
      instance.state.processing.set(false);
      toastr.error("All fields are mandatory", "Can't save");
      unfreezeTheForm(instance);
      return;
    }

    let poolId = instance.$('input[name="pool"]:checked')[0].value;
    thing.privacy = { private: !!poolId }
    if ( instance.myDropzone.files.length > 0 ) {
      // TODO:
      // TEST CASE
      //
      // HOW-TO: try switching to another screen as soon as possible after clicking 'Save'
      // chances are there will be no JS to handle S3 response and hence to update the Thing with image url
      S3.upload({
  				files:[instance.myDropzone.files[0]]
  			},function(e,r){

          if (!e) {
            // console.log(r);
            thing.image = {
              url: r.secure_url
            }

            saveThing(thing, poolId);
            doAfterSuccessfullySaved( instance, thing );
          } else {
            // console.log(e);
            toastr.error("Try posting again", "Something went wrong...");
            unfreezeTheForm(instance);
          }
  		});
    } else {
      saveThing(thing, poolId);
      doAfterSuccessfullySaved( instance, thing );
    }
  }
});

Template.share_form.onRendered(function() {
  this.myDropzone = new Dropzone("div#myDropzone", {
    url: "/",
    init() {
      this.on('addedfile', function(file) {
        console.log('added file');
        console.log(myDropzone.files);
      })
    },
    maxFiles: 1,
  });
});

function saveThing(thing, poolId) {
  Things.insert( thing, (err, _id) => {
    if ( !err ) {
      console.log(poolId);
      if (poolId) {
        Things.update(
          { _id },
          { $set:
            { "privacy.hash": Pools.findOne( { _id: poolId } ).hash }
          }
        );
      }
    }
  } );
}

function doAfterSuccessfullySaved(instance, thing) {
  instance.state.processing.set(false);
  instance.state.saved.set(true);
  instance.state.thing = thing;
  toastr.success("Done!");
  sendEmail( thing );
}

function freezeTheForm(instance) {
  instance.$('.js-save')[0].disabled = true;
  let categoryInput = instance.$('select#category')[0];
  categoryInput.disabled = true;
  let whatInput = instance.$('input#what')[0];
  whatInput.disabled = true;
  let whereInput = instance.$('input#where')[0];
  whereInput.disabled = true;
  let descriptionInput = instance.$('input#description')[0];
  descriptionInput.disabled = true;
  let priceInput = instance.$('input#price')[0];
  priceInput.disabled = true;
}

function unfreezeTheForm(instance) {
  instance.$('.js-save')[0]
  .disabled                 = false;
  let categoryInput         = instance.$('select#category')[0];
  categoryInput.disabled    = false;
  let whatInput             = instance.$('input#what')[0];
  whatInput.disabled        = false;
  let whereInput            = instance.$('input#where')[0];
  whereInput.disabled       = false;
  let descriptionInput      = instance.$('input#description')[0];
  descriptionInput.disabled = false;
  let priceInput            = instance.$('input#price')[0];
  priceInput.disabled       = false;
}

function isThingValid(thing) {
  return !!thing.category && !!thing.name && !!thing.address && !!thing.description && !!thing.price;
}

function sendEmail(thing) {
  Meteor.call('sendStartSharingEmail',
    Meteor.user().services.facebook.email, // to
    'BookAnything <noreply@bookanything.com>', // from
    thing
  );
}
