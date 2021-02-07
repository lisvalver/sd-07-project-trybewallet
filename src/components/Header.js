import React from 'react';

export default function Header({ email, totalExpenses}) {
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
            { totalExpenses }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </div>
    </header>
  );
}
