import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Grid, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';
import PasswordVaultDisplay from '../components/PasswordVaultDisplay';

class PasswordVault extends React.Component {

    state = { value: '', search: '', activePage: 1, passwordsPerPage: 40 }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage: activePage })

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        const { activePage, passwordsPerPage } = this.state;
        /** Default Display */
        let passwordsOnPage = this.props.password;

        /** Pagination */
        const totalPages = Math.ceil(passwordsOnPage.length / passwordsPerPage);
        passwordsOnPage = passwordsOnPage.slice(
            (activePage - 1) * passwordsPerPage,
            (activePage - 1) * passwordsPerPage + passwordsPerPage,
        );

        return (
            <Container fluid style={{ padding: '0 290px' }}>
                <Header as="h2" textAlign="center">My Passwords</Header>
                <Grid centered>
                    <Grid.Row>
                        <Card.Group style={{ marginTop: '20px' }}>
                            {passwordsOnPage.map((club, index) => <PasswordVaultDisplay key={index} club={club}/>)}
                        </Card.Group>
                    </Grid.Row>
                    <Grid.Row>
                        <Pagination
                            activePage={activePage}
                            totalPages={totalPages}
                            siblingRange={1}
                            onPageChange={this.handlePaginationChange}
                        />
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

PasswordVault.propTypes = {
    password: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription1 = Meteor.subscribe('MyClubs');
    let username = '';
    if (Meteor.user() !== undefined) {
        username = Meteor.user().username;
    }
    return {
        password: Clubs.find({ email: username }).fetch(),
        ready: subscription1.ready(),
    };
})(PasswordVault);
