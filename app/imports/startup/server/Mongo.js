import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interests/Interests';

/* eslint-disable no-console */

function addClubs(data) {
  console.log(`  Adding: ${data.clubName}`);
  Clubs.insert(data);
  data.interest.forEach(function (interest) {
    if (!(_.contains(_.pluck(Interests.find().fetch(), 'interest'), interest))) {
      Interests.insert({ interest: interest });
    }
  });
}

if (Clubs.find().count() === 0) {
  if (Meteor.settings.loadAssetsFile) {
    const assetFile = 'uhclubs.json';
    console.log(`Loading clubs from ${assetFile}`);
    const jsonData = JSON.parse(Assets.getText(assetFile));
    jsonData.map(data => addClubs(data));
  }
}
