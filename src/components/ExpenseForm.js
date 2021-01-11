import React, { Component } from 'react';

class ExpenseForm extends Component {
  render() {
    return (
      <section className="form">
        <div>
          <form>
            <label htmlFor="value">
              Valor:
              <input
                className="input"
                type="text"
                placeholder="Valor"
                id="value"
                data-testid="value-input"
              />
            </label>
            <label htmlFor="currency">
              Moeda:
              <select
                className="input"
                placeholder="Moeda"
                id="currency"
                data-testid="currency-input"
              >
                {/* Aqui usarei um Map do Fetch */}
                <option value="USD" data-testid="USD">
                  USD
                </option>
              </select>
            </label>
            <label htmlFor="method">
              Método:
              <select className="input" id="method" data-testid="method-input">
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
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
              <input
                className="input"
                type="text"
                placeholder="Sua descrição"
                id="description"
                data-testid="description-input"
              />
            </label>
            <button className="button" type="button">
              Adicionar despesa
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default ExpenseForm;
