import React from 'react';

class Form extends React.Component {
  render() {
    const { value, description, currency, method, tag } = this.props;
    return (
      <div>
        <input
          type="number"
          name="value"
          value={ value }
          data-testid="value-input"
        />
        <input
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
        />
        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
        >

        </select>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
        <button>Adicionar despesa</button>
      </div>
    )
  }
}

export default Form;