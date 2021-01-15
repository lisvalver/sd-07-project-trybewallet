import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let expensesTotal = 0;

    const calcExpense = ({ value, currency, exchangeRates }) => {
      const result = parseInt(value, 10) * exchangeRates[currency].ask;
      return result;
    };

    if (expenses.length > 0) {
      expensesTotal = expenses
        .reduce(
          (acc, expense) => calcExpense(expense) + acc, 0,
        );
    }

    return (
      <header>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ expensesTotal }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }),
}).isRequired;

const mapStatetoProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStatetoProps)(Header);
