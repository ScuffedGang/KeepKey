import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ClubOwner from '../components/ClubOwner';
import { Clubs } from '../../api/club/Clubs';
import ClubPending from '../components/ClubPending';
import ClubDenied from '../components/ClubDenied';
import ClubDeleted from '../components/ClubDeleted';

class MyClub extends React.Component {

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
                    <Header as="h2" textAlign="center">My Clubs</Header>
                    {this.props.clubs.length !== 0 ?
                        <Card.Group>
                            {this.props.clubs.map((club, index) => {
                              switch (club.status) {
                                case 'active': return <ClubOwner key={index} club={club}/>;
                                case 'pending': return <ClubPending key={index} club={club}/>;
                                case 'denied': return <ClubDenied key={index} club={club}/>;
                                case 'deleted': return <ClubDeleted key={index} club={club}/>;
                                default:
                                  return console.log('Status error');
                              }
                                })}
                        </Card.Group> :
                        <Grid centered>
                            <Grid.Row>
                                <p id='noClubs'>
                                Sorry, It seems like you don&apos;t have any clubs yet.
                                </p>
                            </Grid.Row>
                            <Grid.Row>
                                <Button as={NavLink} activeClassName="active" exact to="/add" key='add'>
                                  Click here to create a new club!</Button>
                            </Grid.Row>
                        </Grid>
                    }
                </Container>
            );
    }
}


MyClub.propTypes = {
    clubs: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('MyClubs');
    let username = '';
    if (Meteor.user() !== undefined) {
        username = Meteor.user().username;
    }
    return {
        clubs: Clubs.find({ email: username }).fetch(),
        ready: subscription.ready(),
    };
})(MyClub);
