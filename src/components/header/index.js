import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// https://medium.com/reactbrasil/substituindo-o-redux-pelo-context-api-react-hooks-a70e995daa1d
// https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd

const Header = () => {
  const email = useSelector((state) => state.user.email);
  const total = useSelector((state) => state.wallet.totalValue);
  const totalValue = total ? total.toFixed(2) : 0;

  // https://stackoverflow.com/questions/58159108/react-get-state-from-redux-store-within-useeffect
  useEffect(() => {
  }, [total]);

  return (
    <header>
      <div data-testid="email-field">{ email }</div>
      <div data-testid="total-field">{ totalValue }</div>
      <div data-testid="header-currency-field">BRL</div>
    </header>
  );
};

export default Header;
