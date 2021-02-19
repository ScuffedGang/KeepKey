import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role, firstName, lastName, interests, picture) {
  console.log(`  Creating user ${email}: ${firstName} ${lastName}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {
      firstName: firstName,
      lastName: lastName,
      interests: interests,
      picture: picture,
    },
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'clubOwner') {
    Roles.addUsersToRoles(userID, 'clubOwner');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role, profile }) => createUser(
        email, password, role, profile.firstName, profile.lastName, profile.interests, profile.picture,
    ));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
