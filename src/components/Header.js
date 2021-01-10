import React from 'react';
import logo from '../images/trybe-400x400.jpg';

const Header = () => (
  <div className="App-header">
    <h1>
      trybe
      <img className="App-logo" src={ logo } alt="beloved trybe logo" />
    </h1>
    <h1>Wallet</h1>
    <div>
      <p>
        <em data-testid="email-field">Não Logado!</em>
      </p>
      <p>
        <strong>Despesas: </strong>
        <em data-testid="total-field">0</em>
      </p>
      <p>
        <strong>Moeda: </strong>
        <em data-testid="header-currency-field">BRL</em>
      </p>
    </div>
  </div>
);

export default Header;
