import React from 'react';
import { Card, Modal, Button } from 'semantic-ui-react';
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
                  <Card>
                    <Card.Content>
                      <Card.Meta>Site Username: {this.props.club.contact}</Card.Meta>
                      <Card.Meta>Site Email: {this.props.club.email}</Card.Meta>
                    </Card.Content>
                  </Card>
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
