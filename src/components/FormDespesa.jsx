import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../actions';

class FormDespesa extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      paymentMethod: '',
      category: '',
    };
  }

  handleClick() {
    const { putExpenses } = this.props;
    const {
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;

    putExpenses(value, description, currency, paymentMethod, category);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // prettier-ignore
  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option>Escolha</option>
              {currencies.map((element) => (
                <option key={ element.name } data-testid={ element.code }>
                  {element.code}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="paymentMethod"
              value={ paymentMethod }
              onChange={ this.handleChange }
            >
              <option>Escolha</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              name="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option>Escolha</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button type="button" onClick={ this.handleClick }>
            Adicionar despesas
          </button>
        </form>
      </div>
    );
  }
}

FormDespesa.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      codein: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  putExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  putExpenses: Actions.putExpenses,
};

export default connect(null, mapDispatchToProps)(FormDespesa);
