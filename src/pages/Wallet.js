import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div data-testid="email-field">Email</div>
          <div data-testid="total-field">Despesa Total: R$0,00</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
      </div>
    );
  }
}

export default Wallet;
