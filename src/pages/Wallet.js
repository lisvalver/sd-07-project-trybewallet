import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email, despesas } = {};
    return (
      <div>
        <header>
          <section data-testid="email-field">
            Email: { email }
          </section>
          <section data-testid="total-field">
            Despesas Totais: R${ despesas }
          </section>
          <section data-testid="header-currency-field">
            BRL
          </section>
        </header>
      </div>
    );
  }
}

export default connect()(Wallet);
