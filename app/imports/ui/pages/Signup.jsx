import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Header, Divider, Form, Grid, Segment, Message, Button, Image } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import ParticlesBg from 'particles-bg';
import Sky from 'react-sky';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', firstName: '', lastName: ' ', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName } = this.state;
    const interests = [];
    Accounts.createUser({
      username: email,
      password: password,
      email: email,
      profile: {
        firstName: firstName,
        lastName: lastName,
        interests: interests,
      } }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <div>
        <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment className='sign-in-up'>
            <Header as='h1' textAlign='center' className='transparent-green-box' >
              <Image src='../images/KeepKeyLogoBack.png'/>Sign up for Keep Key</Header>
            <Form onSubmit={this.submit}>
              <Form.Input
                  name="firstName"
                  placeholder="First name"
                  type="firstName"
                  onChange={this.handleChange}
              />
              <Form.Input
                  name="lastName"
                  placeholder="Last name"
                  type="lastName"
                  onChange={this.handleChange}
              />
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
                <Form.Button content="Register"/>
            </Form>
            {this.state.error === '' ? (
                ''
            ) : (
                <Message
                    error
                    header="Registration was not successful"
                    content={this.state.error}
                />
            )}
            <Divider horizontal>OR</Divider>
              <Header textAlign='center' as='h3' className='sign-in-up-subtext'>
                Already have an account?</Header>
              <Link to="/signin">
                <Button content='Sign in' icon='sign in' size='medium' />
              </Link>
            </Segment>
          </Grid.Column>
        </Grid>
        <Sky
            images={{
              0: "../images/key1.png",
              1: "../images/key2.png",
              2: "../images/key3.png",
              3: "../images/key4.png",
              4: "../images/key5.png",
              5: "../images/key6.png",
            }}
            how={350}
            time={40}
            size={'100px'}
            background={'palettedvioletred'}
        />
        <ParticlesBg color='#024731' num={30} type='cobweb' bg={true} />
      </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
