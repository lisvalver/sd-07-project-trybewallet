import React from 'react';

class Wallet extends React.Component {
  render() {
    return <div>TrybeWallet
      <header>
        <p data-testid="email-field">email aqui</p>
        <p>Despesa Total: </p> 
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    </div>;
  }
}

export default Wallet;
