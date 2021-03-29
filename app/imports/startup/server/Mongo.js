import { Meteor } from 'meteor/meteor';
import { Keys } from '../../api/keys/Keys';

/* eslint-disable no-console */

function addKeys(data) {
  console.log(`  Adding: ${data.keyName}`);
  Keys.insert(data);
}

if (Keys.find().count() === 0) {
  if (Meteor.settings.loadAssetsFile) {
    const assetFile = 'exampleKeys.json';
    console.log(`Loading clubs from ${assetFile}`);
    const jsonData = JSON.parse(Assets.getText(assetFile));
    jsonData.map(data => addKeys(data));
  }
}
