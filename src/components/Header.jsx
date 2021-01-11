import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expense } = this.props;

    const expenseTot = expense.reduce((total, expenses) => {
      const { value, currency, exchangeRates } = expenses;
      return total + exchangeRates[currency].ask * value;
    }, 0);

    return (
      <header className="header-wallet">
        Email:
        <span
          data-testid="email-field"
        >
          { email }
        </span>
        <br />
        Despesa total:
        <span
          data-testid="total-field"
        >
          R$
          {' '}
          { parseFloat(expenseTot).toFixed(2) }
          {' '}
        </span>
        <span
          data-testid="header-currency-field"
        >
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expense: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
