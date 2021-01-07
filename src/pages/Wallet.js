import React from 'react';
import { Header } from '../components';
import './Wallet.css';

const ExpenseForm = () => (
  <section className="expense">
    <div>
      <form>
        <br />
        <br />
        <label htmlFor="value">
          Valor:
          <input className="input" type="text" placeholder="Valor" id="value" data-testid="value-input" />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select className="input" placeholder="Moeda" id="currency" data-testid="currency-input">
            {/* aqui vai um fetch das moedas excluindo um tipo, abaixo apenas uma option para exeplificar */}
            <option value="USD" data-testid="USD">USD</option>
          </select>
        </label>
        <label htmlFor="method">
          Método:
          <select className="input" id="method" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Dinheiro">Cartão de crédito</option>
            <option value="Dinheiro">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select className="input" id="tag" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input className="input" type="text" placeholder="Sua descrição" id="description" data-testid="description-input" />
        </label>
        <input className="button" type="submit" value="Adicionar despesa" />
      </form>
    </div>
  </section>
);
const Wallet = () => (
  <div>
    <Header />
    <ExpenseForm />
  </div>
);

export default Wallet;
