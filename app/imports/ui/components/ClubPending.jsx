import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Image, Statistic, Container, Icon, Dimmer, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Clubs } from '../../api/club/Clubs';

class ClubPending extends React.Component {

  removeClub(docID) {
    swal({
      title: 'Are you sure?',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
      closeOnClickOutside: false,
    })
        .then((willDelete) => {
          if (willDelete) {
            swal('Reason for removal:', {
              content: 'input',
              closeOnClickOutside: false,
            })
                .then((value) => {
                  if (value !== '') {
                    Clubs.remove(docID);
                    swal('Club has been removed.', {
                      icon: 'success',
                      closeOnClickOutside: false,
                    });
                  } else {
                    swal({
                      text: 'Must provide a reason for removal.',
                      icon: 'warning',
                      dangerMode: true,
                      closeOnClickOutside: false,
                    });
                  }
                });
          }
        });
  }

  render() {
    let clubInterest = '';
    // Just in case the club has multiple interests.
    for (let i = 0; i < this.props.club.interest.length; i++) {
      if (i === this.props.club.interest.length - 1) {
        clubInterest += this.props.club.interest[i];
      } else {
        clubInterest += `${this.props.club.interest[i]}, `;
      }
    }

    return (
        <Card centered fluid>
          <Dimmer.Dimmable blurring dimmed={true}>
            <Card.Content>
              <Image floated='left' src={this.props.club.image} />
              <Card.Header>{this.props.club.clubName}</Card.Header>
              <Card.Meta>Contact: {this.props.club.contact}</Card.Meta>
              <Card.Meta>Email: {this.props.club.email}</Card.Meta>
              <Card.Meta>Interests: {clubInterest}</Card.Meta>
              <Container fluid>{this.props.club.description}</Container>
            </Card.Content>
            <Dimmer active={true}>
              <Header inverted>
                Submission for &quot;{this.props.club.clubName}&quot; is pending...
              </Header>
            </Dimmer>
          </Dimmer.Dimmable>
          <Card.Content extra>
            <Statistic size='tiny'>
              <Statistic.Value>
                <Icon name='heart' color='red' />
                {this.props.club.favoritesCount}
              </Statistic.Value>
              <Statistic.Label>Favorites</Statistic.Label>
            </Statistic>
            <Button floated='right' onClick={() => { this.removeClub(this.props.club._id); } }>Delete</Button>
            <Button floated='right' as={Link} to={`/edit/${this.props.club._id}`}>Edit</Button>
          </Card.Content>
        </Card>
    );
  }
}


ClubPending.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ClubPending);
