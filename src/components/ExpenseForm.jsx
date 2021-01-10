import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropDown from './DropDown';
import configPaymentMethod from '../configs/paymentMethod';
import configCategories from '../configs/categories';
import * as currencyAPI from '../services/api';
import { fetchCurrencyAPI } from '../actions';

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
      currency: 'USD',
      paymentMethod: configPaymentMethod[0],
      category: configCategories[0],
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
    this.setState({
      currencyTypes: requestResponse,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { lastId, fetchCurrency } = this.props;
    const id = lastId.length;
    const {
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;

    const expenseDetails = {
      id,
      value,
      description,
      currency,
      method: paymentMethod,
      tag: category,
    };
    fetchCurrency(expenseDetails);
  }

  render() {
    const { value,
      description,
      currencyTypes,
      currency,
      paymentMethod,
      category,
    } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="text"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description">
            Descrição:
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
            id="category"
            dataTest="tag-input"
            options={ configCategories }
            selectValue={ category }
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

const mapStateToProps = (state) => ({
  lastId: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: (expenseDetails) => dispatch(fetchCurrencyAPI(expenseDetails)),
});

ExpenseForm.propTypes = {
  lastId: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
