import React from 'react';
import {Grid, Segment, Header, Button} from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Keys } from '../../api/keys/Keys';
import {Link} from "react-router-dom";

const makeSchema = (keySchema) => new SimpleSchema({
  keyName: String,
  password: String,
  username: String,
  website: String,
  owner: { type: String, optional: true },
  description: { type: String, optional: true },
});

/** Renders the Page for adding a document. */
class AddKey extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { keyName, password, website, username, description } = data;
    const owner = Meteor.user().username;
    Keys.insert({ keyName, password, username, website, owner, description },
        (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success!', 'New key has been created and saved.', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const keySchema = null;
    const formSchema = makeSchema(keySchema);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Key</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <TextField name='keyName'/>
                  <TextField name='website'/>
                  <Segment.Group horizontal>
                    <Segment><TextField name='username'/></Segment>
                    <Segment><TextField name='password'/></Segment>
                  </Segment.Group>
                  <LongTextField name='description'/>
                  <SubmitField value='Submit'/>
                  <Link to="/my-keys"><Button>Back</Button></Link>
                  <ErrorsField/>
                </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('Keys');
  return {
    ready: subscription.ready(),
  };
})(AddKey);
