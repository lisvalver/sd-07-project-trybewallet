import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../img/logo.webp';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
      total: 0,
    };
  }

  render() {
    const { currency, total } = this.state;
    const { email } = this.props;
    return (
      <div className="header-wallet">
        TrybeWallet
        <header>
          <img src={ logo } alt="Logo Trybe" className="logo-header" />
          <div>
            <p data-testid="email-field">{email}</p>
            <p>
              Despesa Total:
              <p data-testid="header-currency-field">{currency}</p>
              <p data-testid="total-field">{total}</p>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
