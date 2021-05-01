import React from 'react';
import { Card, Button, Container, Header} from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  render() {
    return (
        <Container>
          <Header as='h1'>Account Profile</Header>
          <hr/>
          <Card fluid>
            <Card.Content>
              <Card.Header>{Meteor.user().profile.firstName} {Meteor.user().profile.lastName}</Card.Header>
              <Card.Meta>{Meteor.user().username}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Link to='/editprofile'>
                <Button basic>Edit</Button>
              </Link>
               <Link to='/removed'>
                <Button class="button1" onClick={Meteor.users.remove({_id: this.userId})} >Delete Account</Button>
               </Link>
            </Card.Content>
          </Card>
        </Container>
    );
  }
}

export default Profile;