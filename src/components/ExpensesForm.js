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
      currency: [],
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
  }

  render() {
    const { currenciesOption } = this.state;
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
        <label htmlFor="expense">
          Expense Value:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            onChange={ this.getHandle }
          />
        </label>
        <label htmlFor="expense-description">
          Expense Description:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.getHandle }
          />
        </label>
        <label htmlFor="expense-option">
          Expense Currency:
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.getHandle }
          >
            {currenciesOption.sort()
              .map((option, index) => (
                <option
                  key={ index }
                  name={ option }
                  value={ option }
                  data-testid={ option }
                >
                  { option }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="payment-method">
          Payment Method:
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.getHandle }
          >
            {paymentsMethod
              .map((payment, index) => (
                <option
                  key={ index }
                  name={ payment }
                  value={ payment }
                >
                  { payment }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="expense-category">
          Expense Category:
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.getHandle }
          >
            {expenseCategory
              .map((expense, index) => (
                <option
                  key={ index }
                  name={ expense }
                  value={ expense }
                >
                  { expense }
                </option>
              ))}
          </select>
        </label>
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
