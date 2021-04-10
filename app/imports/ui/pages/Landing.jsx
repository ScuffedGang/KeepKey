import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Menu, Tab, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Counts } from 'meteor/tmeasday:publish-counts';
import Sky from 'react-sky';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  state = { activeIndex: null }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
      // eslint-disable-next-line no-unused-vars
    const { activeIndex } = this.state;

    /** Tab panes for information */
    const panes = [
      {
        menuItem: (
            <Menu.Item key='CL-UH-B' className='info-header'>
              What is KeepKey?
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'>
          <Grid columns={2} verticalAlign='middle'>
            <Grid.Column width={14}>
              <Header as='h4' className='info-desc'>
                KeepKey is a safe and easy method of storing and organizing your sensitive private information all in
                one space!
              </Header>
            </Grid.Column>
          </Grid>
        </Tab.Pane>,
      },
      {
        menuItem: (
            <Menu.Item key='SLD Values' className='info-header'>
              How does it work?
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'>
          <Header as='h4' className='info-desc'>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
            KeepKey's stores your information in our database with secure encryption and multi-factor
            authentication so that you and you alone can see your information without risk of theft.
          </Header>
        </Tab.Pane>,
      },
      {
        menuItem: (
            <Menu.Item key='RIOsClubs' className='info-header'>
              What does KeepKey store?
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'>
          <Header as='h4' className='info-desc'>
            Anything really. You can store anything from lock combinations to account passwords by storing and
            organizing them within our database system to retrieve them when needed.
          </Header>
        </Tab.Pane>,
      },
      {
        menuItem: (
            <Menu.Item key='Mission Statement' className='info-header'>
             The KeepKey Guarantee
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'>
          <Header as='h4' className='info-desc'>
           Our team of developers work around the clock utilizing the most advance encryption and security techniques
            to guarantee your privacy and security.
          </Header>
        </Tab.Pane>,
      },
    ];

    return (
      <div>
        <Container fluid className='landing-visuals'>
          <Grid verticalAlign='middle' style={{ height: '750px' }} centered columns={2}>
              <Grid.Column>
                  <center>
                    <Image class= 'center' size='big' src='../images/KeepKeyLogoBack.png'/>
                    <b>
                      Store, Organize, Protect...
                    </b>
                </center>
              </Grid.Column>
          </Grid>
          <Sky
              images={{
                0: '../images/key1.png',
                1: '../images/key2.png',
                2: '../images/key3.png',
                3: '../images/key4.png',
                4: '../images/key5.png',
                5: '../images/key6.png',
              }}
              how={350}
              time={40}
              size={'100px'}
              background={'palettedvioletred'}
          />
        </Container>
        <Container className='landing-information'>
          <Grid verticalAlign='middle'>
            <Grid.Row>
             <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

Landing.propTypes = {
  count: PropTypes.number,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('ClubCount');
  return {
    count: Counts.get('ClubCount'),
    ready: subscription.ready(),
  };
})(Landing);
