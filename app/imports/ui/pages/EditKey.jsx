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
import { Keys } from '../../api/keys/Keys';

// eslint-disable-next-line no-unused-vars
const makeSchema = (keySchema) => new SimpleSchema({
  keyName: String,
  password: String,
  username: String,
  website: String,
  owner: { type: String, optional: true },
  description: { type: String, optional: true },
});

/** Renders the Page for editing a single document. */
class EditKey extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { keyName, website, username, password, description, _id } = data;
    Keys.update(_id, { $set: { keyName, website, username, password, description } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Key updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active inverted>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    // eslint-disable-next-line no-unused-vars
    let fRef = null;
    const keySchema = null;
    const formSchema = makeSchema(keySchema);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Key</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema}
                      onSubmit={data => this.submit(data)} model={this.props.doc}>
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

EditKey.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription1 = Meteor.subscribe('MyKeys');
  return {
    doc: Keys.findOne(documentId),
    ready: subscription1.ready(),
  };
})(EditKey);
