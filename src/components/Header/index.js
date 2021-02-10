import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userEmail, expenses } = this.props;
    const amount = expenses.reduce((acc, curr) => acc + curr.value
      * curr.exchangeRates[curr.currency].ask, 0);

    return (
      <header>
        <span>
          TrybeWallet
        </span>
        <span data-testid="email-field">
          { `Email: ${userEmail}` }
        </span>
        <span data-testid="total-field">
          { amount }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
