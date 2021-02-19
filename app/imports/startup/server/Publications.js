import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interests/Interests';
import { Favorites } from '../../api/favorites/Favorites';

/** This subscription publishes only the clubs owned by the logged in user */
Meteor.publish('MyClubs', function publish() {
  if (this.userId) {
    return Clubs.find();
  }
  return this.ready();
});

/** This subscription publishes all the clubs for all users to browse. */
Meteor.publish('Clubs', function publish() {
  if (this.userId) {
    return Clubs.find({ status: 'active' });
  }
  return this.ready();
});

/** This subscription publishes all club interest */
Meteor.publish('Interests', function publish() {
  return Interests.find();
});

/** This subscription publishes only clubs favorited by user */
Meteor.publish('Favorites', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Favorites.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes only the clubs that have been submitted to view. */
Meteor.publish('Submitted', function publish() {
  if (this.userId) {
    return Clubs.find({ status: 'pending' });
  }
  return this.ready();
});

Meteor.publish('LuckyClubs', function publish() {
  if (this.userId) {
    const interests = Meteor.users.findOne(this.userId).profile.interests;
    if (interests.length !== 0) {
      Counts.publish(this, 'LuckyCount', Clubs.find({ interest: { $in: interests } }));
      return Clubs.find({ interest: { $in: interests } });
    }
      Counts.publish(this, 'LuckyCount', Clubs.find({}));
      return Clubs.find({});

  }
  return this.ready();
});

Meteor.publish('ClubCount', function publish() {
  Counts.publish(this, 'ClubCount', Clubs.find({ status: 'active' }));
});
