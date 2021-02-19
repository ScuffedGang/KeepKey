import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Card, Button, Grid, Transition } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Clubs } from '../../api/club/Clubs';
import ModClubLucky from '../components/ModClubLucky';
import { Favorites } from '../../api/favorites/Favorites';

class Lucky extends React.Component {

    state = { random: -1, roll: true, animation: true, timeout: 50 };

    componentDidMount() {
        if (this.state.roll === true) {
            this.setState({ roll: false, animation: true });
            this.interval = setInterval(this.handleState.bind(this),
                this.state.timeout);
        } else {
            this.pause();
        }
    }


    handleState() {
        if (this.props.ready === true) {
            this.setState({
                random: Math.floor(Math.random() * this.props.clubs.length),
            });
        }
    }

    scroll() {
        if (this.state.roll === true) {
            this.setState({ roll: false, animation: true });
            this.interval = setInterval(() => this.setState({
                random: Math.floor(Math.random() * this.props.clubs.length),
            }), 60);
        } else {
            this.pause();
        }
    }

    pause() {
        clearInterval(this.interval);
        this.setState({ roll: true, animation: false });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        const random = Math.floor(Math.random() * this.props.clubs.length);
        let duration = 400;
        let animation = 'shake';
        if (this.state.animation === false) {
            duration = 800;
            animation = 'jiggle';
        }

        return (
                <Grid centered padded >
                    <Grid.Row>
                        <Header as="h2" textAlign="center">🍀 I&apos;m Feeling Lucky! 🍀️</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Transition visible={this.state.animation} animation={animation} duration={duration}>
                            <Card.Group>
                                {this.state.random === -1 ?
                                    <ModClubLucky club={this.props.clubs[random]} favorites={this.props.favorites}/> :
                                 <ModClubLucky club={this.props.clubs[this.state.random]}
                                               favorites={this.props.favorites}/>}
                            </Card.Group>
                        </Transition>
                    </Grid.Row>
                    <Grid.Row>
                        {this.state.animation ?
                            <Button onClick={this.scroll.bind(this)}> Click Me to Stop</Button> :
                            <Button onClick={this.scroll.bind(this)}> I&apos;m Feeling Lucky!</Button>}
                    </Grid.Row>
                </Grid>
        );
    }
}

Lucky.propTypes = {
    clubs: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('LuckyClubs');
    const subscription2 = Meteor.subscribe('Favorites');
    const count = Clubs.find({}).count();
    const actual = Counts.get('LuckyCount');
    return {
        ready: subscription.ready() && subscription2.ready() && (count === actual),
        clubs: Clubs.find({}).fetch(),
        favorites: Favorites.find({}).fetch(),
    };
})(Lucky);
