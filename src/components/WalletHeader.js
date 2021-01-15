import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses(expenses) {
    const reduceAndSum = expenses.reduce((acc, expense) => {
      const value = parseFloat(expense.value);
      const multiplier = parseFloat(expense.exchangeRates[expense.currency].ask);
      return acc + value * multiplier;
    }, 0);
    return reduceAndSum;
  }

  render() {
    const { email, expenses } = this.props;
    const totalSum = this.sumExpenses(expenses);
    return (
      <header>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ totalSum.toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
