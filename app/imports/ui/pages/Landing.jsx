import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Statistic, Button, Accordion, Icon, Menu, Tab, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import PropTypes from 'prop-types';
import { Counts } from 'meteor/tmeasday:publish-counts';
import TypeWriter from '../components/TyperWriter';

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
    const { activeIndex } = this.state;

    /** Background Visuals */
    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      alpha: [0.6, 0],
      scale: [0.1, 0.4],
      position: 'all',
      color: ['random', '#024731'],
      cross: 'dead',
      random: 15,
    };

    if (Math.random() > 0.85) {
      config = Object.assign(config, {
        onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(
              particle.p.x,
              particle.p.y,
              particle.radius * 2,
              particle.radius * 2,
          );
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
        },
      });
    }

    /** Tab panes for information */
    const panes = [
      {
        menuItem: (
            <Menu.Item key='CL-UH-B' className='info-header'>
              CL-UH-B
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'>
          <Grid columns={2} verticalAlign='middle'>
            <Grid.Column width={2}>
             <Image src='../images/black-cl-uh-b.png' size='small'/>
            </Grid.Column>
            <Grid.Column width={14}>
              <Header as='h4' className='info-desc'>
                Our goal is to help promote clubs at the University of Hawai&apos;i at Manoa.
                To do this, we have created a simple website for students to browse through the hundreds of clubs
                that our school offers.
              </Header>
            </Grid.Column>
          </Grid>
        </Tab.Pane>,
      },
      {
        menuItem: (
            <Menu.Item key='SLD Values' className='info-header'>
              Student Life & Development Values
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'>
          <Header as='h4' className='info-desc'>
            Student Life & Development values programs and services that complement all students&apos; educational
            development and support the development and growth of Registered Independent Organizations. RIOs
            provide a laboratory of citizenship for training students in leadership and social responsibility.
            RIOs afford students the opportunity to practice decision-making skills, develop interpersonal
            communication skills, learn to reduce conflict and solve problems, develop group management skills,
            and express opinions and thoughts clearly.
          </Header>
        </Tab.Pane>,
      },
      {
        menuItem: (
            <Menu.Item key='RIOsClubs' className='info-header'>
              What are RIOs/Clubs?
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'>
          <Header as='h4' className='info-desc'>
            More than 200 current Registered Independent Organizations (RIOs) at the University of Hawaiʻi
            at Mānoa serve the campus and greater community by providing leadership development for students
            and by promoting community spirit, activism, public service, and social, recreational, and cultural
            interaction among UHM students, faculty, and staff.
          </Header>
        </Tab.Pane>,
      },
      {
        menuItem: (
            <Menu.Item key='Mission Statement' className='info-header'>
              SLD Mission Statement
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'>
          <Header as='h4' className='info-desc'>
            The Office of Student Life and Development (SLD) is committed to providing a spectrum of involvement
            and learning opportunities for students through innovative programs and quality services which promote
            leadership, life skills, and personal development while enhancing campus life.
          </Header>
        </Tab.Pane>,
      },
    ];

    return (
      <div>
        <Container fluid className='landing-visuals'>
          <Grid stackable container verticalAlign='middle' style={{ height: '750px' }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h1' className='visual-header'>
                  CL-UH-B
                  <TypeWriter dataText='There&apos;s a club waiting for you.' />
                </Header>
                <Link to='/browse'>
                  <Button size='large' inverted content='Get Started' className='visual-button' />
                </Link>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Statistic size='huge'>
                  <Statistic.Value className='visual-header'>{this.props.count}</Statistic.Value>
                  <Statistic.Label className='visual-subheader'>Clubs at Manoa</Statistic.Label>
                </Statistic>
                <Button size='large' style={{ backgroundColor: 'transparent' }} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <ParticlesBg type="custom" config={config} bg={true} />
        </Container>
        <Container className='landing-information'>
          <Grid verticalAlign='middle'>
            <Grid.Row>
             <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
            </Grid.Row>
          </Grid>
        </Container>
        <div className='accordion-section'>
          <Container fluid style={{ padding: '0 400px' }}>
            <Header as='h2'>Students</Header>
            <Accordion fluid styled>
              <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.handleClick}
                  className='accordion-title'
              >
                <Icon name='dropdown' />
                Sign in/Sign up
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0} className='accordion-content'>
                <p>
                  By signing in/signing up, you get access to the club browser and features such as
                  favorites, recommendations, and &quot;I&apos;m Feeling Lucky!&quot;
                </p>
              </Accordion.Content>
              <Accordion.Title
                  active={activeIndex === 1}
                  index={1}
                  onClick={this.handleClick}
                  className='accordion-title'
              >
                <Icon name='dropdown' />
                Browsing
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1} className='accordion-content'>
                <p><strong>Just want to browse?</strong> Just click on &quot;Browse Clubs&quot; to search through
                the hundreds of clubs at UH Manoa!</p>
                <p><strong>You have a specific interest?</strong> Easily search for clubs that match your interest with
                our &quot;Select Interest&quot; feature!</p>
                <p><strong>Know the club you&apos;re looking for?</strong> Use the search bar to
                filter it down to keywords so that you can quickly find their information!</p>
                <p><strong>Find a club interesting?</strong> Favorite it by clicking the heart so
                that you can view it later</p>
              </Accordion.Content>
              <Accordion.Title
                  active={activeIndex === 3}
                  index={3}
                  onClick={this.handleClick}
                  className='accordion-title'
              >
                <Icon name='dropdown' />
                Profile
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 3} className='accordion-content'>
                <p>Get to your profile by clicking your name on the top right.</p>
                <p><strong>Edit Profile:</strong> You can edit your profile picture, name, and interest.</p>
                <p><strong>View Favorites:</strong> If you favorited a club, you can view it in the
                &quot;Favorites&quot; tab of your profile.</p>
                <p><strong>View Recommendations:</strong> By setting interest to your profile, you can view
                clubs that match it in the &quot;Recommended For You&quot; tab</p>
                <p>
                  <strong>I&apos;m feeling lucky: </strong>
                  With this feature, you can get a random club based on your interest!</p>
              </Accordion.Content>
            </Accordion>
            <Header as='h2'>Club Owners</Header>
            <Accordion fluid styled>
              <Accordion.Title
                  active={activeIndex === 4}
                  index={4}
                  onClick={this.handleClick}
                  className='accordion-title'
              >
                <Icon name='dropdown' />
                Own a club that&apos;s not listed?
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 4} className='accordion-content'>
                <p>Click on &quot;Add Club&quot; to fill out a form to add it. Once the form is submitted,
                  it will be reviewed by one of our admins before being listed for students to see.</p>
              </Accordion.Content>
              <Accordion.Title
                  active={activeIndex === 5}
                  index={5}
                  onClick={this.handleClick}
                  className='accordion-title'
              >
                <Icon name='dropdown' />
                My Clubs
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 5} className='accordion-content'>
                <p><strong>Have a club?</strong> Click on &quot;My Clubs&quot; to view your club information. You can
                  check to see if it has been approved or still pending approval.
                  You can also view how many people have favorited your club!</p>
                <p><strong>Notice a discrepancy?</strong> Click the &quot;Edit&quot; button to fix your club&apos;s
                information.</p>
              </Accordion.Content>
            </Accordion>
          </Container>
        </div>
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
