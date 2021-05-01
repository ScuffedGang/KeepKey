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
import { updateProfileMethod } from '../../startup/both/Methods';

// eslint-disable-next-line no-unused-vars
const makeSchema = (profileSchema) => new SimpleSchema({
  firstName: { type: String, label: 'First Name' },
  lastName: { type: String, label: 'Last Name' },
  password: { type: String, label: 'Password' },
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
    let fRef = null;
    const profileSchema = null;
    const formSchema = makeSchema(profileSchema);
    const user = Meteor.user().profile;
    const model = _.extend({}, user);
    return (
      <div>
        <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment className='sign-in-up'>
              <Header as='h2' textAlign='center' className='transparent-box'>Edit Profile</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema}
                        onSubmit={data => this.submit(data, fRef)} model={model} showInlineError >
                <TextField name='firstName' />
                <TextField name='lastName' />
                <TextField name='password' />
                <SubmitField value='Submit' />
                <Link to="/profile"><Button>Back</Button></Link>
              </AutoForm>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
EditProfile.propTypes = {
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const profile = Meteor.user() !== undefined;
  return {
    ready: profile,
  };
})(EditProfile);
