import React from 'react'
import { connect } from 'react-redux';

class Form extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <fieldset>
        <legend>Tabela de gastos</legend>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            name="value-input"
            id="value-input"
            type="number"
            placeholder="ex: 00.00"
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
            name="description-input"
            id="description-input"
            type="text"
            placeholder="ex: Compra de mês"
          />
        </label>
        <label htmlFor="currency-input">
          <select
            data-testid="currency-input"
            name="currency-input"
            id="currency-input"
          >
          </select>
        </label>
        <label htmlFor="method-input">
          <select
            data-testid="method-input"
            name="method-input"
            id="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          <select
            data-testid="tag-input"
            name="tag-input"
            id="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </fieldset>
    );
  }
}

export default Form;
