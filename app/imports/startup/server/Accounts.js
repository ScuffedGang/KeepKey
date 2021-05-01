import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint-disable no-console */

function createUser(email, password, firstName, lastName) {
  console.log(`  Creating user ${email}: ${firstName} ${lastName}.`);
  Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {
      firstName: firstName,
      lastName: lastName,
      password: password,
    },
  });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, profile }) => createUser(
        email, password, profile.firstName, profile.lastName, profile.password,
    ));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
