import React from 'react';
import swal from 'sweetalert';
import { Card, Button, Image, Label, Grid, Modal, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Clubs, ClubSchema } from '../../api/club/Clubs';

class ClubAdmin extends React.Component {

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
                    Clubs.update(docID, { $set: { status: 'deleted' } });
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
    let defaultRating = 0;
    if (_.contains(_.pluck(this.props.favorites, 'FavoriteId'), this.props.club._id)) {
      defaultRating = 1;
    } else {
      defaultRating = 0;
    }
    return (
        <Card centered>
          <Card.Content>
            <Grid columns={2}>
              <Grid.Column width={5}>
                <Image id="card-image"
                       floated={'left'}
                       verticalAlign='middle'
                       src={this.props.club.image}
                />
              </Grid.Column>
              <Grid.Column width={11}>
                <Card.Header style={ { marginBottom: 5 } }>{this.props.club.clubName}</Card.Header>
                {_.map(this.props.club.interest,
                    (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content extra>
            <Modal dimmer='blurring' trigger={<Button size='mini'>Click For More Info</Button>} closeIcon>
              <Modal.Header>{this.props.club.clubName}</Modal.Header>
              <Modal.Content image>
                <Image id="modal-image"
                       floated={'left'}
                       src={this.props.club.image}
                />
                <Modal.Description>
                  <p>
                    {this.props.club.description}
                    <br/>
                    {_.map(this.props.club.interest,
                        (interest, index) => <Label style={ { marginTop: 10 }}
                                                    key={index}
                                                    size='medium'
                                                    color='teal'>
                          {interest}</Label>)}
                  </p>
                  <Card>
                    <Card.Content>
                      <Card.Meta>Contact: {this.props.club.contact}</Card.Meta>
                      <Card.Meta>Email: {this.props.club.email}</Card.Meta>
                    </Card.Content>
                  </Card>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <Button size='mini' disabled={this.props.club.website === ''}>
              <a href={this.props.club.website}>Website</a></Button>
            <Rating
                id='card-rank'
                icon='heart'
                size='huge'
                rating={defaultRating}
                schema={ClubSchema}
                onRate={this.handleRate}
                maxRating={1}/>
          </Card.Content>
          <Card.Content extra>
            <Button verticleAlign='middle' onClick={() => { this.removeClub(this.props.club._id); } }>Delete</Button>
          </Card.Content>
        </Card>
    );
  }
}

ClubAdmin.propTypes = {
  club: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ClubAdmin);
