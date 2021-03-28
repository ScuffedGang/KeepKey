import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import KeyOwner from '../components/KeyOwner';
import { Keys } from '../../api/keys/Keys';
import ClubPending from '../components/ClubPending';
import ClubDenied from '../components/ClubDenied';
import ClubDeleted from '../components/ClubDeleted';

class MyKeys extends React.Component {

    state = { redirect: false };

    add() {
        this.setState({ redirect: true });
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
            return (
                <Container>
                    <Header as="h2" textAlign="center">My Keys</Header>
                    {this.props.keys.length !== 0 ?
                        <Card.Group>
                            {this.props.keys.map((keys, index) => {
                                return <KeyOwner key={index} keys={keys}/>;
                                })}
                        </Card.Group> :
                        <Grid centered>
                            <Grid.Row>
                                <p id='noKeys'>
                                Sorry, It seems like you don&apos;t have any keys yet.
                                </p>
                            </Grid.Row>
                            <Grid.Row>
                                <Button as={NavLink} activeClassName="active" exact to="/add" key='add'>
                                  Click here to store a new key.</Button>
                            </Grid.Row>
                        </Grid>
                    }
                </Container>
            );
    }
}

MyKeys.propTypes = {
    keys: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('MyKeys');
    let username = '';
    if (Meteor.user() !== undefined) {
        username = Meteor.user().username;
    }
    return {
        keys: Keys.find({ owner: username }).fetch(),
        ready: subscription.ready(),
    };
})(MyKeys);
