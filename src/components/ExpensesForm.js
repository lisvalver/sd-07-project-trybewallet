import React, { Component } from 'react';

import fetchDataCurency from '../api/api';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyOptions: [],
    };

    this.fetchCurency = this.fetchCurency.bind(this);
  }

  componentDidMount() {
    this.fetchCurency();
  }

  async fetchCurency() {
    const currencyResponse = await fetchDataCurency();
    const currencies = Object.keys(currencyResponse)
      .filter((currency) => currency !== 'USDT');

    this.setState({
      currencyOptions: currencies,
    });
  }

  render() {
    const { currencyOptions } = this.state;
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
          <input type="number" data-testid="value-input" />
        </label>
        <label htmlFor="expense-description">
          Expense Description:
          <input type="text" data-testid="description-input" />
        </label>
        <label htmlFor="expense-option">
          Expense Currency:
          <select
            name="expense-option"
            data-testid="currency-input"
          >
            {currencyOptions
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
            name="payment-method"
            data-testid="method-input"
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
            name="expense-category"
            data-testid="tag-input"
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
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

export default ExpensesForm;
