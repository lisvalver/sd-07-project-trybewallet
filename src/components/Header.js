import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const email = useSelector((state) => state.user.email);
  const total = useSelector((state) => state.wallet.totalExpenses);
  const expenseValue = total ? total.toFixed(2) : 0;
  return (
    <header>
      <span data-testid="email-field">
        {email}
      </span>
      <span data-testid="total-field">{ expenseValue }</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
};

export default Header;
