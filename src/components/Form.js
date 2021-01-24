import React from 'react';

export default function Form({ currencies, setState, onSubmit, description, value, currency, method, tag }) {
  return (
    <form>
      <label>
        Despesa:
        <input
          type="text"
          className="input-expense description"
          data-testid="description-input"
          placeholder="descrição..."
          value ={ description }
          name="description"
          onChange={ setState }
        />
      </label>
      <label>
        Valor:
        <input
          type="number"
          className="input-expense value"
          data-testid="value-input"
          placeholder="0"
          value ={ value }
          name="value"
          onChange={ setState }
        />
      </label>
      <div>
        <span>Moeda:</span>
        <select
          data-testid="currency-input"
          className="input-expense"
          value ={ currency }
          name="currency"
          onChange={ setState }
        >
          <option value="">-</option>
          {currencies()}
        </select>
      </div>
      <div>
        <span>Método de pagamento:</span>
        <select
          data-testid="method-input"
          className="input-expense"
          value ={ method }
          name="method"
          onChange={ setState }
        >
          <option value="">Selecione...</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>
      <div>
        <span>Tag:</span>
        <select
          data-testid="tag-input"
          className="input-expense"
          value ={ tag }
          name="tag"
          onChange={ setState }
        >
          <option value="">Selecione...</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
      <button type="button" className="add-expense" onClick={ onSubmit }>
        Adicionar despesa
      </button>
    </form>
  );
}
