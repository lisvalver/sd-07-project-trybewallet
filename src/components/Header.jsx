import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailInfo } = this.props;
    return (
      <header>
        <ul>
          <li data-testid="email-field">
            {emailInfo}
          </li>
          <li data-testid="total-field">
            0
          </li>
          <li data-testid="header-currency-field">
            BRL
          </li>
        </ul>
      </header>
    );
  }
}

Header.propTypes = {
  emailInfo: PropTypes.string.isRequired,
};

export default Header;
