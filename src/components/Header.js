import React from 'react';
import propTypes from 'prop-types';

export default function Header({ email, totalExpenses }) {
  let correctCost = totalExpenses;
  if (!correctCost) correctCost = 0;
  return (
    <header>
      <div>
        <p data-testid="email-field">
          {`Olá, ${email}`}
        </p>
      </div>
      <div>
        <p>
          Suas despesas totais são:
          {' '}
          <span data-testid="total-field">
            { correctCost }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </div>
    </header>
  );
}

Header.propTypes = {
  email: propTypes.string.isRequired,
  totalExpenses: propTypes.number.isRequired,
};
