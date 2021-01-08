import React, { Component } from 'react';

class ExpensesForm extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            {' '}
            Valor
            <input data-testid="value-input" />
          </label>
          <label>
            {' '}
            Descrição da despesa
            <input data-testid="description-input" />
          </label>
          <select>
            Moedas
            <option>USD</option>
            <option>CAD</option>
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="button">Adicionar despesa</button>
        </form>
      </div>

    );
  }
}
