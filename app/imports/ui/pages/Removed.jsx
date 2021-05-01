import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Delete Account" link in the Profile Page, It deletes the account and display this page. */
export default class Removed extends React.Component {
    render() {
        Meteor.logout();
        return (
            <Header as="h2" textAlign="center">
                <p>Your Account has been removed.</p>
            </Header>
        );
    }
}
