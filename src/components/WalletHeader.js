import React, { Component } from 'react';

import { connect } from 'react-redux';

class WalletHeader extends Component {
  constructor() {
    super();
    this.handleTotalExpensesValue = this.handleTotalExpensesValue.bind(this);
  }

  handleTotalExpensesValue() {
    const { expenses } = this.props;
    let totalPriceExpenses = 0;
    expenses.forEach((expense) => {
      totalPriceExpenses += expense.value * expense.exchangeRates[expense.currency].ask;
    });
    return totalPriceExpenses;
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <p data-testid="total-field">{this.handleTotalExpensesValue()}</p>
        <div data-testid="email-field">{email}</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.allInfosCurrencies,
});

export default connect(mapStateToProps)(WalletHeader);
