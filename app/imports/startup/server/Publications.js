import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Keys } from '../../api/keys/Keys';
import { Interests } from '../../api/interests/Interests';
import { Favorites } from '../../api/favorites/Favorites';

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

/** This subscription publishes all club interest */
Meteor.publish('Interests', function publish() {
  return Interests.find();
});

/** This subscription publishes only Keys favorited by user */
Meteor.publish('Favorites', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Favorites.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes only the Keys that have been submitted to view. */
Meteor.publish('Submitted', function publish() {
  if (this.userId) {
    return Keys.find({});
  }
  return this.ready();
});

Meteor.publish('LuckyKeys', function publish() {
  if (this.userId) {
    const interests = Meteor.users.findOne(this.userId).profile.interests;
    if (interests.length !== 0) {
      Counts.publish(this, 'LuckyCount', Keys.find({ }));
      return Keys.find({ interest: { $in: interests } });
    }
      Counts.publish(this, 'LuckyCount', Keys.find({}));
      return Keys.find({});

  }
  return this.ready();
});

Meteor.publish('ClubCount', function publish() {
  Counts.publish(this, 'ClubCount', Keys.find({}));
});
