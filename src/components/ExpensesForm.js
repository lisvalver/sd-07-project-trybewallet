import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions';
import fetchDataCurency from '../api/api';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currenciesOption: [],
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: [],
    };

    this.fetchCurency = this.fetchCurency.bind(this);
    this.getHandle = this.getHandle.bind(this);
    this.fetchExpenses = this.fetchExpenses.bind(this);
  }

  componentDidMount() {
    this.fetchCurency();
  }

  getHandle({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async fetchCurency() {
    const currencyResponse = await fetchDataCurency();
    const currencies = Object.keys(currencyResponse)
      .filter((currency) => currency !== 'USDT');

    this.setState({
      currenciesOption: currencies,
    });
  }

  clearState() {
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: [],
    })
  }

  async fetchExpenses() {
    const { value, description, currency, method, tag } = this.state;
    const { regExpense } = this.props;
    const exchangeRates = await fetchDataCurency();
    const expenseObject = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    regExpense(expenseObject);
    this.clearState();
  }

  render() {
    const { currenciesOption, value, description } = this.state;
    const paymentsMethod = [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];

    const expenseCategory = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

    return (
      <form>
        <label htmlFor="value">Expense Value:</label>
        <input
          type="text"
          id="value"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.getHandle }
        />
          
        <label htmlFor="description">Expense Description:</label>
        <input
          type="text"
          name="description"
          value={ description }
          id="description"
          data-testid="description-input"
          onChange={ this.getHandle }
        />
        
        <label htmlFor="currency">Expense Currency:</label>
        <select
          name="currency"
          id="currency-input"
          data-testid="currency-input"
          onChange={ this.getHandle }
        >
          {currenciesOption.sort()
            .map((option, index) => (
              <option
                key={ index }
                name={ option }
                value={ option }
                id={ option }
                data-testid={ option }
              >
                { option }
              </option>
            ))}
        </select>

        <label htmlFor="method">Payment Method:</label>
        <select
          name="method"
          id="method"
          data-testid="method-input"
          onChange={ this.getHandle }
        >
          {paymentsMethod
            .map((payment, index) => (
              <option
                key={ index }
                name={ payment }
                id={ payment }
                value={ payment }
              >
                { payment }
              </option>
            ))}
        </select>

        <label htmlFor="tag">Expense Category:</label>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ this.getHandle }
        >
          {expenseCategory
            .map((expense, index) => (
              <option
                key={ index }
                name={ expense }
                id={ expense }
                value={ expense }
              >
                { expense }
              </option>
            ))}
        </select>

        <button type="button" onClick={ this.fetchExpenses }>Adicionar despesa</button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  regExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  regExpense: (objectExpense) => (dispatch(addExpense(objectExpense))),
});

export default connect(null, mapDispatchToProps)(ExpensesForm);
