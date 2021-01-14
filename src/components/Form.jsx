import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import addExpense from '../actions/addExpense';

class Form extends Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.transformCurrencies = this.transformCurrencies.bind(this);
    this.updateNumberOfExpenses = this.updateNumberOfExpenses.bind(this);
    this.dispatchExpense = this.dispatchExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      json: {},
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: {},
      amount: 0,
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
    this.updateNumberOfExpenses();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  expensesAmount() {
    const { expenses } = this.props;
    let amount = 0;
    if (expenses.length === 0) {
      this.setState({ amount });
    }
    expenses.forEach((expense) => {
      amount += parseFloat(expense.value);
    });
    this.setState({ amount });
  }

  dispatchExpense(e) {
    e.preventDefault();
    const { addExpenseToStore } = this.props;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    fetch(endpoint)
      .then((respose) => respose.json())
      .then((rates) => {
        this.setState({
          exchangeRates: { ...rates },
        });
      })
      .then(() => {
        const {
          exchangeRates,
          value,
          description,
          currency,
          method,
          tag,
          id,
        } = this.state;
        console.log(this.state);
        addExpenseToStore({
          value,
          description,
          currency,
          method,
          tag,
          id,
          exchangeRates,
        });
      })
      .then(() => {
        this.updateNumberOfExpenses();
        this.expensesAmount();
      });
  }

  transformCurrencies(json) {
    const currenciesKeys = Object.keys(json);
    const currenciesPattern = currenciesKeys.filter((currency) => currency !== 'USDT');
    return currenciesPattern;
  }

  fetchCurrencies() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    fetch(endpoint)
      .then((respose) => respose.json())
      .then((json) => {
        this.setState({
          json,
        });
      });
  }

  updateNumberOfExpenses() {
    const { expenses } = this.props;
    const id = expenses.length;
    this.setState({ id });
  }

  render() {
    const {
      json,
      value,
      description,
      currency,
      method,
      tag,
      amount,
    } = this.state;
    const { expenses, emailInfo } = this.props;
    console.log(expenses);
    const currencies = this.transformCurrencies(json);
    return (
      <div>
        <header>
          <ul>
            <li data-testid="email-field">
              {emailInfo}
            </li>
            <li data-testid="total-field">
              {amount}
            </li>
            <li data-testid="header-currency-field">
              BRL
            </li>
          </ul>
        </header>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ (e) => this.handleChange(e) }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ (e) => this.handleChange(e) }
            data-testid="currency-input"
          >
            {currencies.map((currencyName, index) => (
              <option
                key={ index }
                data-testid={ currencyName }
              >
                {currencyName}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ (e) => this.handleChange(e) }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ (e) => this.handleChange(e) }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ (e) => this.handleChange(e) }
            data-testid="description-input"
          />
        </label>
        <button
          type="submit"
          onClick={ (e) => this.dispatchExpense(e) }
        >
          Adicionar Despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  emailInfo: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseToStore: (payload) => {
    dispatch(addExpense(payload));
  },
});

Form.propTypes = {
  addExpenseToStore: PropTypes.func.isRequired,
  expenses: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
