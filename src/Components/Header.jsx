import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../images/logo-wallet.jpg';

class Header extends React.Component {
  render() {
    const { user, amount, cambio } = this.props;
    const base = 10;
    return (
      <div className="container-header">
        <div className="logo-wallet">
          <img src={ Logo } alt="logo" />
        </div>
        <div className="status-wallet">
          <div className="user-wallet" data-testid="email-field">
            <p className="label">Email:</p>
            { user }
          </div>
          <div className="amount-wallet" data-testid="total-field">
            <p className="label">Despesas:</p>
            { parseFloat(amount, base).toFixed(2) }
            <span data-testid="header-currency-field">
              { cambio }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  cambio: PropTypes.string.isRequired,
};

export default Header;
