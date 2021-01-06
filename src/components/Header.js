import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <header>
        <div data-testid="email-field">
          Email:
          { user }
        </div>
        <div>
          Despesa Total: R$
          <span data-testid="total-field">
            0
          </span>
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Header;
