import React from 'react';
import { Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { color: 'blue', backgroundColor: '#FFA600', padding: '15px 0' };
    return (
          <div style={divStyle} className="ui fluid center aligned container" id='footer'>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href='https://www.facebook.com/uhm.studentlife/?ref=ss' target='_blank'><Icon name='facebook'/></a>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href='https://twitter.com/UHM_StudentLife' target='_blank'><Icon name='twitter square'/></a>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href='https://github.com/cl-uh-b' target='_blank'><Icon name='github'/> <br /></a>
            Website Managed by KeepKey <br />
            Information Provided by Student Life & Development <br />
            Phone: (808) 956-8178 · Email: sld@hawaii.edu<br />
            University of Hawaiʻi at Mānoa · 2465 Campus Road, Room 208 · Honolulu, HI 96822
          </div>
    );
  }
}

export default Footer;
