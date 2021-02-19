import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Statistic, Pagination, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import ModClub from '../components/ModClub';
import { Clubs } from '../../api/club/Clubs';
import { Favorites } from '../../api/favorites/Favorites';

class FavoriteClubs extends React.Component {

  state = { activePage: 1, clubsPerPage: 40 }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage: activePage })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activePage, clubsPerPage } = this.state;
    const favorite = _.pluck(this.props.favorites, 'FavoriteId');
    let userFavorites = _.filter(this.props.clubs, (club) => _.contains(favorite, club._id));
    const totalFavorites = _.size(userFavorites);

    /** Pagination */
    const totalPages = Math.ceil(userFavorites.length / clubsPerPage);
    userFavorites = userFavorites.slice(
        (activePage - 1) * clubsPerPage,
        (activePage - 1) * clubsPerPage + clubsPerPage,
    );

    /** Sort by letter */
    userFavorites = userFavorites.sort((a, b) => (a.clubName.toLowerCase() > b.clubName.toLowerCase() ? 1 : -1));

    return (
        <Container fluid>
          <Grid centered>
            <Grid.Row>
              <Statistic horizontal label='Favorites' value={totalFavorites} />
            </Grid.Row>
            <Grid.Row className='fav-rec'>
              <Card.Group>
                {userFavorites.map((club, index) => <ModClub
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

FavoriteClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('Favorites');
  return {
    clubs: Clubs.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(FavoriteClubs);
