import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/keys/Keys';
import { Interests } from '../../api/interests/Interests';
import MultiSelectField from '../forms/controllers/MultiSelectField';

const makeSchema = (clubInterests) => new SimpleSchema({
  clubName: String,
  interest: Array,
  'interest.$': { type: String, allowedValues: clubInterests },
  description: { type: String, optional: true },
  contact: { type: String, defaultValue: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}` },
  email: { type: String, defaultValue: Meteor.user().username },
  website: { type: String, optional: true, defaultValue: '' },
  image: { type: String, optional: true },
});

/** Renders the Page for adding a document. */
class AddClub extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubName, interest, description, contact, email, website, image } = data;
    Clubs.insert({ clubName, interest, description, contact, email, website, image },
        (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success!', 'Club submitted successfully for admin review.', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const clubInterests = _.pluck(Interests.find().fetch(), 'interest');
    const formSchema = makeSchema(clubInterests);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Club</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <TextField name='clubName'/>
                  <MultiSelectField name='interest'/>
                  <LongTextField name='description'/>
                  <Segment.Group horizontal>
                    <Segment><TextField name='contact'/></Segment>
                    <Segment><TextField name='email' disabled/></Segment>
                  </Segment.Group>
                  <Segment.Group horizontal>
                    <Segment><TextField name='website'/></Segment>
                    <Segment><TextField name='image'/></Segment>
                  </Segment.Group>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('Interests');
  return {
    ready: subscription.ready(),
  };
})(AddClub);
