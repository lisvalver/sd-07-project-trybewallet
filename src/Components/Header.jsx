import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../images/logo-wallet.jpg';

class Header extends React.Component {
  render() {
    const { user, amount } = this.props;
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
            { amount }
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default Header;
