import { Meteor } from 'meteor/meteor';

const updateProfileMethod = 'Profile.Update';

Meteor.methods({
  'Profile.Update'({ password, firstName, lastName }) {
    const id = Meteor.user()._id;
    Meteor.users.update({ _id: id }, { $set: {
      profile: {
          firstName: firstName,
          lastName: lastName,
          password: password,
        },
      } });
  },
});

export { updateProfileMethod };
