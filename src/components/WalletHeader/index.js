import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormExpense from '../FormExpense';
import './style.css';

class WalletHeader extends Component {
  render() {
    const { email, expenses } = this.props;

    const formatedExpenses = expenses.reduce(
      (acc, curr) => {
        const ask = parseFloat(curr.exchangeRates[curr.currency].ask);
        const formatedValue = parseFloat(curr.value) * ask;
        return acc + formatedValue;
      },
      0,
    ).toFixed(2);

    return (
      <header>
        <section className="header__login">
          <p data-testid="email-field">{`E-mail: ${email}`}</p>
          <p data-testid="total-field">{`Despesa Total: R$ ${formatedExpenses}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </section>
        <FormExpense />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.defaultProps = { email: 'ada@lovelace.com' };
WalletHeader.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
