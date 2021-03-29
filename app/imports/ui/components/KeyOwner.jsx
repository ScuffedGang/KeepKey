import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Image, Statistic, Container, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Keys } from '../../api/keys/Keys';

class KeyOwner extends React.Component {

  removekeys(docID) {
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
                      console.log(docID);
                    Keys.remove(docID);
                    swal('keys has been removed.', {
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
    return (
        <Card centered fluid>
          <Card.Content>
            <Card.Header style={ { fontSize: 25, marginBottom: 5 } }>{this.props.keys.keyName}<Button onClick={() => this.removekeys(this.props.keys._id)} floated="right" color="red" >Delete Key</Button></Card.Header>
            <Card.Meta>Email: {this.props.keys.username}</Card.Meta>
            <Card.Meta>Password: {this.props.keys.password}</Card.Meta>
            <Container>{this.props.keys.description}</Container>
          </Card.Content>
        </Card>
    );
  }
}

Keys.propTypes = {
  keys: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(KeyOwner);
