import React from 'react';
import { Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { color: 'blue', backgroundColor: '#FFA600', padding: '15px 0' };
    return (
          <div style={divStyle} className="ui fluid center aligned container" id='footer'>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href='https://github.com/ScuffedGang' target='_blank'><Icon name='github'/> <br /></a>
            Website Managed by ScuffedGang <br />
            University of Hawaiʻi at Mānoa · ICS 427 · Software Quality Assurance
          </div>
    );
  }
}

export default Footer;
