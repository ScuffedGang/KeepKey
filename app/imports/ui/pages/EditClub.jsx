import React from 'react';
import { Grid, Loader, Header, Segment, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/keys/Keys';
import { Interests } from '../../api/interests/Interests';
import MultiSelectField from '../forms/controllers/MultiSelectField';

const makeSchema = (clubInterests) => new SimpleSchema({
  clubName: String,
  interest: Array,
  'interest.$': { type: String, allowedValues: clubInterests },
  description: { type: String, optional: true },
  contact: String,
  email: String,
  website: { type: String, optional: true, defaultValue: '' },
  image: { type: String, optional: true },
});

/** Renders the Page for editing a single document. */
class EditClub extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { clubName, interest, description, contact, email, website, image, _id } = data;
    Clubs.update(_id, { $set: { clubName, interest, description, contact, email, website, image } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Club updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active inverted>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const clubInterests = _.pluck(Interests.find().fetch(), 'interest');
    const formSchema = makeSchema(clubInterests);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Club</Header>
            <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} model={this.props.doc} >
              <Segment>
                <TextField name='clubName'/>
                <MultiSelectField name='interest'/>
                <LongTextField name='description'/>
                <Segment.Group horizontal>
                  <Segment><TextField name='contact'/></Segment>
                  <Segment><TextField name='email'/></Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment><TextField name='website'/></Segment>
                  <Segment><TextField name='image'/></Segment>
                </Segment.Group>
                <SubmitField value='Submit'/>
                <Link to="/my-clubs"><Button>Back</Button></Link>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

EditClub.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription1 = Meteor.subscribe('MyClubs');
  const subscription2 = Meteor.subscribe('Interests');
  return {
    doc: Clubs.findOne(documentId),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(EditClub);
