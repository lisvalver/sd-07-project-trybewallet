import React from 'react';
import PropTypes from 'prop-types';

export default function AddExpense({ currencies, saveExpense, changeState }) {
  return (
    <nav>
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          step="0.01"
          type="number"
          data-testid="value-input"
          onChange={ changeState }
        />
      </label>
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          type="text"
          data-testid="description-input"
          onChange={ changeState }
        />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          data-testid="currency-input"
          onChange={ changeState }
        >
          <option>moedas</option>
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
          onChange={ changeState }
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
          onChange={ changeState }
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
        onClick={ saveExpense }
      >
        Adicionar despesa
      </button>
    </nav>
  );
}

AddExpense.propTypes = {
  changeState: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  saveExpense: PropTypes.func.isRequired,
};
