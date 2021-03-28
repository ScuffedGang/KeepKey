import React from 'react';
import { Card, Modal, Button, Grid, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Clubs } from '../../api/club/Clubs';

class PasswordVaultDisplay extends React.Component {
  /** removePassword(docID) is used to allow the used to remove their passwords */
  removePassword(docID) {
    swal('Are you sure?', {
      buttons: {
        nevermind: { text: 'Nevermind', value: 'nevermind' },
        confirm: { text: 'Delete Password', value: 'confirm' },
      },
      dangerMode: true,
      closeOnClickOutside: false,
    })
      .then((value) => {
        switch (value) {
          case 'confirm':
            Clubs.remove(docID);
            swal('Password has been removed from your vault.', {
              icon: 'success',
              closeOnClickOutside: false,
            });
            break;
          case 'nevermind':
            swal('Canceled deletion', {
              icon: 'error',
              closeOnClickOutside: false,
            });
            break;
          default:
            swal({
              text: 'Error occured.',
              icon: 'warning',
              dangerMode: true,
              closeOnClickOutside: false,
            });
            break;
        }
      });
  }

  render() {
    return (
      <Card centered>
        <Card.Content>
            <Card.Header style={ { marginBottom: 5 } }>{this.props.club.clubName}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Modal dimmer='blurring' trigger={<Button icon='info'/>} closeIcon>
            <Modal.Header>{this.props.club.clubName}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Grid container centered>
                  <Grid.Column>
                    <Segment>
                      <Segment.Group vertical>
                        <Segment><Header as='h4'>URL:</Header>
                          {this.props.club.website}</Segment>
                        <Segment><Header as='h4'>Name:</Header>
                          {this.props.club.website}</Segment>
                      </Segment.Group>
                      <Segment.Group horizontal>
                        <Segment><Header as='h4'>Username:</Header>
                          {this.props.club.email}</Segment>
                        <Segment><Header as='h4'>Password:</Header>
                          {this.props.club.email}</Segment>
                      </Segment.Group>
                      <Segment><Header as='h4'>Notes:</Header>
                        {this.props.club.description}</Segment>
                    </Segment>
                  </Grid.Column>
                </Grid>
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Button as={Link} to={`/edit/${this.props.club._id}`} icon='edit'/>
          <Button onClick={() => { this.removePassword(this.props.club._id); } } icon='trash alternate'/>
        </Card.Content>
      </Card>
    );
  }
}

PasswordVaultDisplay.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(PasswordVaultDisplay);
