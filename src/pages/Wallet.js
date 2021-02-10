import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as actionCreators from '../actions/index';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: -1,
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.submitExpense = this.submitExpense.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectExpense = this.selectExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
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
        this.setState({
          value: '',
          description: '',
          currency: '',
          method: 'Dinheiro',
          tag: 'Alimentação',
        });
      });
  }

  removeExpense(id) {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

  selectExpense(expense) {
    this.setState({
      id: expense.id,
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      exchangeRates: expense.exchangeRates,
    });
  }

  editExpense() {
    const { editExpense } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    editExpense(expense);
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { currencies, email, money, expenses } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    let button = null;
    if (id >= 0) {
      button = (
        <button onClick={ this.editExpense } type="button">
          Editar despesa
        </button>
      );
    } else {
      button = (
        <button onClick={ this.submitExpense } type="button">
          Adicionar despesa
        </button>
      );
    }
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
            { money || 0 }
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
        { button }
        <Table
          content={ expenses }
          remove={ this.removeExpense }
          edit={ this.selectExpense }
        />
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
  editExpense: (expense) => {
    dispatch(actionCreators.editExpense(expense));
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
  editExpense: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
