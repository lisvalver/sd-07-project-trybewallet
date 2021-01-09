import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddExpense extends Component {
  constructor() {
    super();
    this.changeState = this.changeState.bind(this);
    this.state = {
      description: '',
      currency: '',
      method: '',
      value: 0,
      tag: '',
    };
  }

  changeState({ target: { id, value } }) {
    return id === 'value'
      ? this.setState({ [id]: +value })
      : this.setState({ [id]: value });
  }

  render() {
    const { currencies, saveExpense } = this.props;
    return (
      <nav>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            step="0.01"
            type="number"
            data-testid="value-input"
            onChange={ this.changeState }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            data-testid="description-input"
            onChange={ this.changeState }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            onChange={ this.changeState }
          >
            {Object.keys(currencies).filter((cur) => cur !== 'USDT')
              .map((currencie, i) => (
                <option
                  key={ `${currencie + i}` }
                  data-testid={ currencie }
                >
                  { currencie }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            data-testid="method-input"
            onChange={ this.changeState }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            id="tag"
            data-testid="tag-input"
            onChange={ this.changeState }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => { saveExpense(this.state); } }
        >
          Adicionar despesa
        </button>
      </nav>
    );
  }
}

AddExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveExpense: PropTypes.func.isRequired,
};
