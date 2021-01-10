import React from 'react';
import propTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      handleChange,
    } = this.props;

    return (
      <form>
        <input
          type="number"
          name="value"
          value={ value }
          onChange={ handleChange }
          data-testid="value-input"
        />
        <input
          type="text"
          name="description"
          value={ description }
          onChange={ handleChange }
          data-testid="description-input"
        />
        <select
          name="currency"
          value={ currency }
          onChange={ handleChange }
          data-testid="currency-input"
        >
          <option value="a">a</option>
        </select>
        <select
          name="method"
          value={ method }
          onChange={ handleChange }
          data-testid="method-input"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
          onChange={ handleChange }
          data-testid="tag-input"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  value: propTypes.number.isRequired,
  description: propTypes.string.isRequired,
  currency: propTypes.string.isRequired,
  method: propTypes.string.isRequired,
  tag: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};
