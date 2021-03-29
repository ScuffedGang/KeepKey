import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Container, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Clubs } from '../../api/keys/Keys';

class SubmittedClubs extends React.Component {

  denySubmission(docID) {
    swal({
      title: 'Are you sure?',
      buttons: ['Cancel', 'Deny'],
      dangerMode: true,
      closeOnClickOutside: false,
    })
        .then((willDelete) => {
          if (willDelete) {
            swal('Reason for denying submission:', {
              content: 'input',
              closeOnClickOutside: false,
            })
                .then((value) => {
                  if (value !== '') {
                    Clubs.update(docID, { $set: { status: 'denied' } });
                    swal('Club has been denied.', {
                      icon: 'success',
                      closeOnClickOutside: false,
                    });
                  } else {
                    swal({
                      text: 'Must provide a reason for denying submission.',
                      icon: 'warning',
                      dangerMode: true,
                      closeOnClickOutside: false,
                    });
                  }
                });
          }
        });
  }

  acceptSubmission(docID) {
    swal({
      title: 'Are you sure?',
      buttons: ['Cancel', 'Accept'],
      closeOnClickOutside: false,
    })
        .then((willAccept) => {
          if (willAccept) {
            swal('Club has been accepted.', {
              icon: 'success',
              closeOnClickOutside: false,
            });
            Clubs.update(docID, { $set: { status: 'active' } });
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
          <Card.Content>
            <Image floated='left' src={this.props.club.image} />
            <Card.Header style={ { fontSize: 25, marginBottom: 5 } }>{this.props.club.clubName}</Card.Header>
            <Card.Meta>Contact: {this.props.club.contact}</Card.Meta>
            <Card.Meta>Email: {this.props.club.email}</Card.Meta>
            <Card.Meta rel="noopener noreferrer" target="_blank" href={this.props.club.website}>
              Website: {this.props.club.website}</Card.Meta>
            <p/>
            <Card.Meta>Interests: {clubInterest} </Card.Meta>
            <br/>
            <Container>{this.props.club.description}</Container>
          </Card.Content>
          <Card.Content extra>
            <Button className="ui button" floated="right"
                    onClick={() => { this.denySubmission(this.props.club._id); } }>
              Deny</Button>
            <Button className="ui button" floated="right"
            onClick={() => { this.acceptSubmission(this.props.club._id); } }
            >
              Accept</Button>
          </Card.Content>
        </Card>
    );
  }
}

SubmittedClubs.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SubmittedClubs);
