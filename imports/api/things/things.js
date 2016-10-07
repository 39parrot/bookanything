import { Mongo } from 'meteor/mongo';

export const Things = new Mongo.Collection('things');

Things.publicProjection = {
  "privacy.hash": 0
}
