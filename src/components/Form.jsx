import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, sendObjectExpense } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { api } = this.props;
    api();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { expense, api, sendObj, currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const id = expense.length;
    api();
    const sendExpense = {
      id,
      value,
      description,
      method,
      tag,
      currency,
      exchangeRates: currencies,
    };
    sendObj(sendExpense);
    return sendExpense;
  }

  handleTable() {
    const { expense } = this.props;
    console.log(expense);
  }

  render() {
    const { currencies } = this.props;
    const arrayCurrency = Object.keys(currencies || {}).map((i) => i);
    const listCurrency = arrayCurrency.filter((item) => item !== 'USDT');
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;

    return (
      <div>
        <form action="">

          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              id="description-input"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />

          </label>

          <select
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              listCurrency.map((moeda) => (
                <option
                  key={ moeda }
                  data-testid={ moeda }
                >
                  {moeda}
                </option>
              ))
            }
          </select>

          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button type="button" onClick={ this.handleClick }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispath) => ({
  api: () => dispath(fetchCurrency()),
  sendObj: (objExpense) => dispath(sendObjectExpense(objExpense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.apiExpenses,
  expense: state.wallet.expenses,
});

Form.propTypes = {
  api: PropTypes.func.isRequired,
  expense: PropTypes.arrayOf(Object).isRequired,
  sendObj: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
