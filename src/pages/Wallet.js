import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as actionCreators from '../actions/index';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.submitExpense = this.submitExpense.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  async submitExpense() {
    const { value, description, currency, method, tag } = this.state;
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((result) => result.json())
      .then((data) => {
        delete data.USDT;
        const expense = {
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: data,
        };
        const { addExpense } = this.props;
        addExpense(expense);
      });
  }

  removeExpense(id) {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { currencies, email, money, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <span
            data-testid="email-field"
          >
            { email }
          </span>
          <span
            data-testid="total-field"
          >
            { money }
          </span>
          <h1 data-testid="header-currency-field">BRL</h1>
        </header>
        <div>
          <input
            data-testid="value-input"
            type="number"
            onChange={ (event) => this.handleChange(event, 'value') }
            value={ value }
          />
          <input
            data-testid="description-input"
            type="text"
            onChange={ (event) => this.handleChange(event, 'description') }
            value={ description }
          />
          <select
            data-testid="currency-input"
            onChange={ (event) => this.handleChange(event, 'currency') }
            value={ currency }
          >
            { currencies.map((elem) => (
              <option data-testid={ elem } value={ elem } key={ elem }>
                { elem }
              </option>
            )) }
          </select>
          <select
            data-testid="method-input"
            onChange={ (event) => this.handleChange(event, 'method') }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            onChange={ (event) => this.handleChange(event, 'tag') }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
        <button
          onClick={ this.submitExpense }
          type="button"
        >
          Adicionar despesa
        </button>
        <Table value={ expenses } remove={ this.removeExpense } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  money: state.wallet.money,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => {
    dispatch(actionCreators.addExpense(expense));
  },
  removeExpense: (id) => {
    dispatch(actionCreators.removeExpense(id));
  },
  fetchCurrencies: () => {
    dispatch(actionCreators.fetchCurrencies());
  },
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  money: propTypes.string.isRequired,
  currencies: propTypes.string.isRequired,
  expenses: propTypes.string.isRequired,
  addExpense: propTypes.func.isRequired,
  removeExpense: propTypes.func.isRequired,
  fetchCurrencies: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
