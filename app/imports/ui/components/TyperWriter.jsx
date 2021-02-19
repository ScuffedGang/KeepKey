import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class TypeWriter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isDeleting: false,
            typingSpeed: 100,
            timer: {},
        };
}

    componentDidMount() {
        this.handleType();
    }

    componentWillUnmount() {
        clearTimeout(this.state.timer);
    }

    handleType = () => {
        const dataText = this.props.dataText;
        const { isDeleting, text } = this.state;
        const fullText = dataText;
        const timeout = 3000;

        if (!isDeleting && text === fullText) {

            this.setState({ timer: setTimeout(this.handleDelete.bind(this), timeout) });

        } else if (isDeleting && text === '') {

            this.setState({
                isDeleting: false,
                typingSpeed: 100,
            });

            setTimeout(this.handleType, this.state.typingSpeed);
        } else {
            this.setState({
                text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
                typingSpeed: isDeleting ? 40 : this.state.typingSpeed,
            });

            setTimeout(this.handleType, this.state.typingSpeed);
        }
    };

    handleDelete() {
        this.setState({ isDeleting: true,
            typingSpeed: 40 });
        setTimeout(this.handleType, this.state.typingSpeed);
    }

    render() {
        return (
            <Header.Subheader className='visual-subheader'>
                { this.state.text }
                <span id="cursor"/>
            </Header.Subheader>
        );

    }
}

TypeWriter.propTypes = {
    dataText: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default TypeWriter;
