import React from 'react';
import { Card, Image, Label, Rating, Modal, Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Favorites } from '../../api/favorites/Favorites';
import { Clubs, ClubSchema } from '../../api/keys/Keys';

class ModClub extends React.Component {
  handleRate = () => {
    const owner = Meteor.user().username;
    if (_.contains(_.pluck(this.props.favorites, 'FavoriteId'), this.props.club._id)) {
      Clubs.update(this.props.club._id, { $inc: { favoritesCount: -1 } });
      const removeList = _.findWhere(this.props.favorites, { FavoriteId: this.props.club._id });
      Favorites.remove(removeList._id);
    } else {
      Clubs.update(this.props.club._id, { $inc: { favoritesCount: 1 } });
      Favorites.insert({ FavoriteId: this.props.club._id, owner });
    }
  };

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
                  </p>
                  {_.map(this.props.club.interest,
                      (interest, index) => <Label style={{ marginTop: 10 }}
                                                  key={index}
                                                  size='medium'
                                                  color='teal'>
                        {interest}</Label>)}
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
              <a rel="noopener noreferrer" target="_blank" href={this.props.club.website}>Website</a></Button>
            <Rating
            id='card-rank'
            icon='heart'
            size='huge'
            rating={defaultRating}
            schema={ClubSchema}
            onRate={this.handleRate}
            maxRating={1}/>
          </Card.Content>
        </Card>
    );
  }
}

ModClub.propTypes = {
  club: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ModClub);
