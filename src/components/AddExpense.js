import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAddExpense as addExpense } from '../actions';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  submit() {
    const { addExpenses, expenseIndex } = this.props;
    addExpenses({ ...this.state, id: expenseIndex });
  }

  render() {
    const {
      value,
      description,
    } = this.state;
    const { currencies } = this.props;
    const currenciesCodes = Object.keys(currencies);
    return (
      <div>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            name="value"
            id="value"
            step="0.01"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currenciesCodes.map(
              (code) => (
                <option
                  value={ code }
                  key={ code }
                  data-testid={ code }
                >
                  {code}
                </option>
              ),
            )}
          </select>
        </label>
        <label htmlFor="method">
          Forma de pagamento
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option
              value="Dinheiro"
              key="cash"
              data-testid="cash"
            >
              Dinheiro
            </option>
            <option
              value="Cartão de crédito"
              key="credit-card"
              data-testid="credit-card"
            >
              Cartão de crédito
            </option>
            <option
              value="Cartão de débito"
              key="debit-card"
              data-testid="debit-card"
            >
              Cartão de débito
            </option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option
              value="Alimentação"
              key="food"
              data-testid="food"
            >
              Alimentação
            </option>
            <option
              value="Lazer"
              key="leisure"
              data-testid="leisure"
            >
              Lazer
            </option>
            <option
              value="Trabalho"
              key="work"
              data-testid="work"
            >
              Trabalho
            </option>
            <option
              value="Transporte"
              key="transport"
              data-testid="transport"
            >
              Transporte
            </option>
            <option
              value="Saúde"
              key="health"
              data-testid="health"
            >
              Saúde
            </option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.submit }
        >
          Adicionar despesa
        </button>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (value) => dispatch(addExpense(value)),
});

AddExpense.propTypes = ({
  currencies: PropTypes.shape(PropTypes.object).isRequired,
  expenseIndex: PropTypes.number.isRequired,
  addExpenses: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(AddExpense);
