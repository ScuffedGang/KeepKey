import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Keys = new Mongo.Collection('Keys');

/** Define a schema to specify the structure of each document in the collection. */
const Keyschema = new SimpleSchema({
  keyName: String,
  owner: String,
  username: String,
  password: String,
  description: { type: String, optional: true, defaultValue: '' },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Keys.attachSchema(Keyschema);

/** Make the collection and schema available to other code. */
export { Keys, Keyschema };
