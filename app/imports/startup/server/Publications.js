import { Meteor } from 'meteor/meteor';
import { Keys } from '../../api/keys/Keys';

/** This subscription publishes only the Keys owned by the logged in user */
Meteor.publish('MyKeys', function publish() {
  if (this.userId) {
    return Keys.find();
  }
  return this.ready();
});

/** This subscription publishes all the Keys for all users to browse. */
Meteor.publish('Keys', function publish() {
  if (this.userId) {
    return Keys.find({});
  }
  return this.ready();
});