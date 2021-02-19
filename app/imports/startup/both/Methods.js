import { Meteor } from 'meteor/meteor';

const updateProfileMethod = 'Profile.Update';

Meteor.methods({
  'Profile.Update'({ firstName, lastName, interests, picture }) {
    const id = Meteor.user()._id;
    Meteor.users.update({ _id: id }, { $set: {
        profile: {
          firstName: firstName,
          lastName: lastName,
          interests: interests,
          picture: picture,
        },
      } });
  },
});

export { updateProfileMethod };
