import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Header, Divider, Form, Grid, Message, Button, Image, Segment } from 'semantic-ui-react';
import ParticlesBg from 'particles-bg';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <div>
          <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Segment className='sign-in-up'>
                <Header as='h1' textAlign='center' className='transparent-green-box'>
                  <Image src='../images/cl-uh-b-logo.png'/>Sign in to CL-UH-B</Header>
                <Form onSubmit={this.submit}>
                  <Form.Input
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Sign in"/>
                </Form>
                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Log in was not successful."
                        content={this.state.error}
                    />
                )}
                <Divider horizontal>OR</Divider>
                <Header textAlign='center' as='h3' className='sign-in-up-subtext'>
                  Don&apos;t have an account?</Header>
                <Link to="/signup">
                  <Button content='Sign up' icon='signup' size='medium' />
                </Link>
              </Segment>
            </Grid.Column>
          </Grid>
          <ParticlesBg color='#024731' num={30} type='cobweb' bg={true} />
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
