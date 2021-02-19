import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Statistic, Grid, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ModClub from '../components/ModClub';
import { Clubs } from '../../api/club/Clubs';
import { Favorites } from '../../api/favorites/Favorites';
import { Interests } from '../../api/interests/Interests';

class RecommendedClubs extends React.Component {

  state = { activePage: 1, clubsPerPage: 40 }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage: activePage })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activePage, clubsPerPage } = this.state;

    let recommendations;
    const interests = Meteor.user().profile.interests;
    if (interests.length !== 0) {
      recommendations = Clubs.find({ interest: { $in: interests } }).fetch();
    } else {
      const random = Math.floor(Math.random() * this.props.interests.length);
      recommendations = Clubs.find({ interest: this.props.interests[random].interest }).fetch();
    }

    const totalRec = recommendations.length;

    /** Pagination */
    const totalPages = Math.ceil(recommendations.length / clubsPerPage);
    recommendations = recommendations.slice(
        (activePage - 1) * clubsPerPage,
        (activePage - 1) * clubsPerPage + clubsPerPage,
    );

    /** Sort by letter */
    recommendations = recommendations.sort((a, b) => (a.clubName.toLowerCase() > b.clubName.toLowerCase() ? 1 : -1));

    return (
        <Container fluid>
          <Grid centered>
            <Grid.Row>
              <Statistic horizontal label='Clubs Recommended For You' value={totalRec} />
            </Grid.Row>
            <Grid.Row className='fav-rec'>
              <Card.Group>
                {recommendations.map((club, index) => <ModClub
                    key={index}
                    club={club}
                    favorites={this.props.favorites}
                />)}
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

RecommendedClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('Favorites');
  const subscription3 = Meteor.subscribe('Interests');
  const profile = Meteor.user() !== undefined;

  return {
    clubs: Clubs.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    interests: Interests.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready() && subscription3.ready() && profile,
  };
})(RecommendedClubs);
