import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpense(arrayOfExpenses) {
    if (arrayOfExpenses.length === 0) return 0;
    let sum = 0;
    const amountOfExpenses = arrayOfExpenses.length;
    for (let i = 0; i < amountOfExpenses; i += 1) {
      const { exchangeRates } = arrayOfExpenses[i];
      // const objectCurrencies = exchangeRates[0];
      const { currency } = arrayOfExpenses[i];
      const { value } = arrayOfExpenses[i];
      const askCurrency = parseFloat(exchangeRates[currency].ask);
      sum += (parseFloat(value) * askCurrency);
      // console.log(exchangeRates);
      // console.log(currency);
      // console.log(askCurrency);
    }
    return sum.toFixed(2);
    // const arrayOfCurrencies = exchangeRates;
    // const { currency } = arrayOfExpenses;
    // const arrayOfValue = arrayOfExpenses.map((expense) => parseFloat(expense.value));
    // const askCurrency = arrayOfCurrencies[currency].ask;
    // const arrayOfCurrency = arrayOfExpenses.map((expense) => parseFloat(expense.ask));
    // let amount = 0;
    // for (let i = 0; i < arrayOfValue.length; i += 1) {
    //  amount += arrayOfValue[i] * arrayOfCurrency[i];
    // }

    // console.log(arrayOfValue);
    // console.log(arrayOfCurrency);
    // console.log(amount);

    // return amount.toFixed(2);
  }

  render() {
    const { user, expenses } = this.props;
    // console.log(expenses);
    const total = this.totalExpense(expenses);
    return (
      <div>
        <p>
          Olá,
          <span data-testid="email-field">{user.email}</span>
        </p>
        <p>
          Despesa Total:
          <span data-testid="total-field">{total}</span>
        </p>
        <p>
          Câmbio utilizado:
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.shape().isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, null)(Header);
