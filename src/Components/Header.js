import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, despesas } = {};
    return (
      <header>
        <section data-testid="email-field">
          Email:
          { email }
        </section>
        <section data-testid="total-field">
          Despesas Totais: R$
          { despesas }
        </section>
        <section data-testid="header-currency-field">BRL</section>
      </header>
    );
  }
}

export default connect()(Header);
