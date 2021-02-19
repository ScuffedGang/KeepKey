import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ParticlesBg from 'particles-bg';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { updateProfileMethod } from '../../startup/both/Methods';
import { Interests } from '../../api/interests/Interests';

const makeSchema = (clubInterests) => new SimpleSchema({
  firstName: { type: String, label: 'First Name' },
  lastName: { type: String, label: 'Last Name' },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: clubInterests },
  picture: { type: String, label: 'Profile Picture', optional: true },
});

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data, formRef) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated', 'success').then(() => formRef.reset());
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : '';
  }

  renderPage() {
    const clubInterests = _.pluck(Interests.find().fetch(), 'interest');
    const formSchema = makeSchema(clubInterests);
    const user = Meteor.user().profile;
    const model = _.extend({}, user);
    let fRef = null;
    return (
      <div>
        <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment className='sign-in-up'>
              <Header as='h2' textAlign='center' className='transparent-green-box'>Edit Profile</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema}
                        onSubmit={data => this.submit(data, fRef)} model={model} showInlineError >
                <TextField name='firstName' />
                <TextField name='lastName' />
                <MultiSelectField name='interests' />
                <TextField name='picture' />
                <SubmitField value='Submit' />
                <Link to="/profile"><Button>Back</Button></Link>
              </AutoForm>
            </Segment>
          </Grid.Column>
        </Grid>
        <ParticlesBg color='#024731' num={30} type='cobweb' bg={true} />
      </div>
    );
  }
}
EditProfile.propTypes = {
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Interests');
  const profile = Meteor.user() !== undefined;
  return {
    ready: subscription.ready() && profile,
  };
})(EditProfile);
