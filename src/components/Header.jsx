import React from 'react';

export default (props) => {
  return (
    <div>
      <span data-testid="email.field" htmlFor="email">
        Email:
      </span>
      <span data-testid="total-field">Despesa total: {0} </span>
      <span data-testid="header-currency-field">BRL</span>
    </div>
  );
};
