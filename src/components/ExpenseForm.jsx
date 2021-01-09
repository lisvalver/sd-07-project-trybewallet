import React, { Component } from 'react';
import DropDown from './DropDown';
import configPaymentMethod from '../configs/paymentMethod';
import configCategories from '../configs/categories';
import * as currencyAPI from '../services/api';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.fetchCurrencyTypes = this.fetchCurrencyTypes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: '',
      description: '',
      currencyTypes: [''],
      currency: 'BRL',
      paymentMethod: configPaymentMethod[0],
      categoty: configCategories[0],
    };
  }

  componentDidMount() {
    this.fetchCurrencyTypes();
  }

  handleChange({ target: { id, value } }) {
    // console.log(`ID: ${id}, Value: ${value}`);
    this.setState({ [id]: value });
  }

  async fetchCurrencyTypes() {
    const requestResponse = await currencyAPI.getTypes();
    const currencyTypes = Object.values(requestResponse)
      .filter((value) => value.codein === 'BRL')
      .map((value) => value.code);

    this.setState({
      currencyTypes,
    });
  }

  handleSubmit(event) {
    console.log('Add expense');
    event.preventDefault();
  }

  render() {
    const { value,
      description,
      currencyTypes,
      currency,
      paymentMethod,
      categoty,
    } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor
            <input
              id="value"
              type="text"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              id="description"
              type="text"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>

          <DropDown
            id="paymentMethod"
            dataTest="method-input"
            options={ configPaymentMethod }
            selectValue={ paymentMethod }
            handleChange={ this.handleChange }
          />

          <DropDown
            id="categoty"
            dataTest="tag-input"
            options={ configCategories }
            selectValue={ categoty }
            handleChange={ this.handleChange }
          />

          <DropDown
            id="currency"
            dataTest="currency-input"
            options={ currencyTypes }
            selectValue={ currency }
            handleChange={ this.handleChange }
          />
          <input type="submit" value="Adicionar despesa" />
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
