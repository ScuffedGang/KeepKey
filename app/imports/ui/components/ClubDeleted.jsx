import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Image, Container, Dimmer, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Clubs } from '../../api/club/Clubs';

class ClubDeleted extends React.Component {

  removeClub(docID) {
    Clubs.remove(docID);
    swal('Club has been removed.', {
      icon: 'success',
      closeOnClickOutside: false,
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
                &quot;{this.props.club.clubName}&quot; was deleted by admin.
              </Header>
            </Dimmer>
          </Dimmer.Dimmable>
          <Card.Content extra>
            <Button floated='right' onClick={() => { this.removeClub(this.props.club._id); } }>Delete</Button>
          </Card.Content>
        </Card>
    );
  }
}


ClubDeleted.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ClubDeleted);
