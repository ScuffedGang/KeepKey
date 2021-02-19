import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Form, Grid, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import ClubAdmin from '../components/ClubAdmin';
import { Clubs } from '../../api/club/Clubs';
import { Favorites } from '../../api/favorites/Favorites';
import { Interests } from '../../api/interests/Interests';

class ListClubsAdmin extends React.Component {

  state = { value: '', search: '', activePage: 1, clubsPerPage: 40 }

  handleChange = (e, { value }) => this.setState({ value })

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage: activePage })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { value, activePage, clubsPerPage } = this.state;
    /** Default Display */
    let clubsOnPage = this.props.clubs;

    /** Assign key, text, values, semantic UI react dropdown */
    const options = this.props.interests.map(int => ({
      key: int.interest,
      text: int.interest,
      value: int.interest,
    }));

    /** Filter to selected interest */
    if (this.state.value === '' || this.state.value.length === 0) {
      clubsOnPage = this.props.clubs;
    } else {
      let filteredResults = [];
      for (let i = 0; i < this.state.value.length; i++) {
        const temp = this.props.clubs.filter((club) => club.interest.includes(this.state.value[i]));
        filteredResults = _.union(filteredResults, temp);
      }
      clubsOnPage = filteredResults;
    }

    /** Filter to search results */
    clubsOnPage = clubsOnPage.filter(
        (club) => club.clubName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1,
    );

    /** Pagination */
    const totalPages = Math.ceil(clubsOnPage.length / clubsPerPage);
    clubsOnPage = clubsOnPage.slice(
        (activePage - 1) * clubsPerPage,
        (activePage - 1) * clubsPerPage + clubsPerPage,
    );

    /** Sort by letter */
    clubsOnPage = clubsOnPage.sort((a, b) => (a.clubName.toLowerCase() > b.clubName.toLowerCase() ? 1 : -1));

    return (
        <Container fluid style={{ padding: '0 290px' }}>
          <Header as="h2" textAlign="center">Clubs at UHM (Admin)</Header>
          <Form size='large'>
            <Form.Group widths='equal'>
              <Form.Input
                  onChange={this.updateSearch.bind(this)}
                  name='search'
                  className='icon'
                  icon='search'
                  placeholder='Search Clubs'
              />
              <Form.Dropdown
                  clearable search selection multiple
                  placeholder='Select Interest'
                  value={value}
                  onChange={this.handleChange}
                  options={options}
              />
            </Form.Group>
          </Form>
          <Grid centered>
            <Grid.Row>
              <Card.Group style={{ marginTop: '20px' }}>
                {clubsOnPage.map(
                  (club, index) => <ClubAdmin key={index} club={club} favorites={this.props.favorites}/>,
                )}
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

ListClubsAdmin.propTypes = {
  clubs: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('Favorites');
  const subscription3 = Meteor.subscribe('Interests');
  return {
    clubs: Clubs.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    interests: Interests.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ListClubsAdmin);
