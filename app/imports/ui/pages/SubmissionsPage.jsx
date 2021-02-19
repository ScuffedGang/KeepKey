import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';
import SubmittedClubs from '../components/SubmittedClubs';

class SubmissionsPage extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Submissions</Header>
          {this.props.clubs.length !== 0 ?
              <Card.Group>
                {this.props.clubs.map((club, index) => <SubmittedClubs key={index} club={club}/>)}
              </Card.Group> :
              <Grid centered verticalAlign='middle'>
                <Grid.Row>
                  <p id='noClubs'>
                    There are no new submissions.
                  </p>
                </Grid.Row>
              </Grid>
          }
        </Container>
    );
  }
}

SubmissionsPage.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Submitted');
  return {
    clubs: Clubs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SubmissionsPage);
