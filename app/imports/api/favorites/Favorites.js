import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Favorites = new Mongo.Collection('Favorites');

/** Define a schema to specify the structure of each document in the collection. */
const FavoritesSchema = new SimpleSchema({
  FavoriteId: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Favorites.attachSchema(FavoritesSchema);

/** Make the collection and schema available to other code. */
export { Favorites, FavoritesSchema };
