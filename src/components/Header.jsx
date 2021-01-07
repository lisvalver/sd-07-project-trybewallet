import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailInfo } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          {emailInfo}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  emailInfo: PropTypes.string.isRequired,
};

export default Header;
