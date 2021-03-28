import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#FFA600' };
    return (
      <Menu inverted borderless style={menuStyle} attached="top">
        <Menu.Item as={NavLink} activeClassName="" exact to="/" style={{ padding: '0px 30px 0px 30px' }}>
          <Image size='small' src='../images/KeepKeyLogo.png'/>
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/browse" key='list'>Browse Clubs</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Club</Menu.Item>]
        ) : ''}
        {this.props.currentUser ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/my-clubs" key='my-clubs'>My Clubs</Menu.Item>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>,
              // eslint-disable-next-line max-len
              <Menu.Item as={NavLink} activeClassName="active" exact to="/submissions" key='submission'>Submissions</Menu.Item>,
            ]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/signin">
                <Icon name='user'/>&nbsp;Sign In</Menu.Item>
          ) : (
            <Dropdown text={Meteor.user().profile.firstName} pointing="top right" icon='user'>
              <Dropdown.Menu>
                <Dropdown.Item icon="id badge outline" text="Profile" as={NavLink} exact to="/profile"/>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
