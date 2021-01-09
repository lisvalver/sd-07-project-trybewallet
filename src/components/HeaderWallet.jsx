import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeaderWallet extends Component {
  render() {
    const { email, expenses } = this.props;
    const expense = expenses.map(({ value }) => value).reduce((acc, crr) => acc + crr, 0);
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span>
          Despesa Total: R$
          <span data-testid="total-field">{expense}</span>
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
