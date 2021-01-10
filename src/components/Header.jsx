import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.totalExpenseCalc = this.totalExpenseCalc.bind(this);
  }

  totalExpenseCalc() {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return '0,00';
    }
    const totalExpense = expenses.reduce((sum, expense) => {
      const askValue = parseFloat(expense.exchangeRates[expense.currency].ask);
      const expenseValue = parseFloat(expense.value);
      return (sum + (askValue * expenseValue));
    }, 0);

    return totalExpense.toFixed(2);
  }

  render() {
    const { loggedEmail } = this.props;
    return (
      <div>
        <h1>Carteira</h1>
        <span data-testid="email-field">
          {`E-mail: ${loggedEmail}`}
        </span>
        <span data-testid="total-field">
          {`Despesa Total: R$ ${this.totalExpenseCalc()} `}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, wallet } = state;
  return {
    loggedEmail: user.email,
    expenses: wallet.expenses };
}

Header.propTypes = {
  loggedEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
