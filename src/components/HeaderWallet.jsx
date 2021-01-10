import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderWallet({ email, expenses }) {
  const expense = expenses.map(
    ({ value, exchangeRates, currency }) => value * exchangeRates[currency].ask,
  ).reduce((acc, crr) => acc + crr, 0);
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

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
