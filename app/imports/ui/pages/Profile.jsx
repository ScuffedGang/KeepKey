import React from 'react';
import { Card, Button, Container, Header, Grid, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class Profile extends React.Component {

  render() {
    if ((this.props.profile) === true) {
      return this.renderPage();
    }

    return '';
  }

  renderPage() {
    let profileInterest = '';
    let profilePicture = '';

    /** Get user profile interest */
    for (let i = 0; i < Meteor.user().profile.interests.length; i++) {
      if (i === Meteor.user().profile.interests.length - 1) {
        profileInterest += Meteor.user().profile.interests[i];
      } else {
        profileInterest += `${Meteor.user().profile.interests[i]}, `;
      }
    }
    /** Display no interest */
    if (profileInterest === '') {
      profileInterest += 'No interests.';
    }

    /** Default profile picture */
    if (Meteor.user().profile.picture) {
      profilePicture = Meteor.user().profile.picture;
    } else {
      profilePicture += 'https://cdn3.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumb900.jpg';
    }

    return (
        <Container fluid className='profile-page'>
          <Header as='h1'>Account Profile</Header>
          <hr/>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <Card className='profile-card'>
                  <Image src={profilePicture} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header className='profile-header'>
                      {Meteor.user().profile.firstName} {Meteor.user().profile.lastName}
                    </Card.Header>
                    <Card.Meta>{Meteor.user().username}</Card.Meta>
                    <Card.Description>Interest: {profileInterest}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Link to='/editprofile'>
                      <Button basic>Edit</Button>
                    </Link>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.bool.isRequired,
};

export default withTracker(() => ({
    profile: Meteor.user() !== undefined,
}))(Profile);
