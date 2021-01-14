import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, fetchCurrencies } from '../actions';
import Expenses from './componentes/Expenses';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.fetchAndSaveExpenses = this.fetchAndSaveExpenses.bind(this);
    this.sumValue = this.sumValue.bind(this);
    this.fetchCurrenciesNames = this.fetchCurrenciesNames.bind(this);
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      currenciesNames: [],
    };
  }

  componentDidMount() {
    this.fetchCurrenciesNames();
  }

  async fetchCurrenciesNames() {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await response.json();
      const currenciesKeys = Object.keys(currencies);
      const currenciesKeysFilter = currenciesKeys.filter((name) => name !== "USDT");
      return this.setState({ currenciesNames: currenciesKeysFilter });
    }
    catch (error) {
      console.log(error);
    }
  }

  sumValue() {
    const { expenses } = this.props;
    const valueSum = expenses.reduce((acc, item) => {
      const itemCurrency = item.currency;
      return (item.value * item.exchangeRates[itemCurrency].ask) + acc;
    }, 0);
    const num = Math.round(valueSum * 100);
    const numToFixed = (parseFloat(num).toFixed(2)) / 100;
    return numToFixed;
  }

  async fetchAndSaveExpenses() {
    const { fetchCurrency, saveExpenses } = this.props;
    const { value, currency, method, tag, description } = this.state;
    await fetchCurrency();
    saveExpenses(value, currency, method, tag, description);
  }

  handleFormInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email } = this.props;
    const { value, currency, method, tag, description, currenciesNames } = this.state;
    return (
      <div>
        <header>
          <ul>
            <li>
              E-mail:
              { email }
            </li>
            <li data-testid="total-field">
              Despesa total: R$
              { this.sumValue() }
            </li>
            <li data-testid="header-currency-field">
              BRL
            </li>
          </ul>
        </header>
        <form>
          <ul>
            <li>
              <label htmlFor="value">
                Valor:
                <input
                name="value"
                id="value"
                type="number"
                data-testid="value-input"
                pattern="\d*"
                min="0"
                value={ value }
                onChange={ (event) => this.handleFormInput(event) }
                />
              </label>
            </li>
            <li>
              Moeda
              <label htmlFor="currency">
                <select
                id="currency"
                data-testid="currency-input"
                name="currency"
                value={ currency }
                onChange={ (event) => this.handleFormInput(event) }
                >
                { currenciesNames.map((element) => {
                  return <option value={element} data-testid={element}>{element}</option>
              })}
                </select>
              </label>
            </li>
            <li>
              Método de Pagamento
              <label htmlFor="method-input">
                <select
                data-testid="method-input"
                id="method-input"
                name="method"
                value={ method }onChange={ (event) => this.handleFormInput(event) }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>
            </li>
            <li>
              Tag
              <label htmlFor="tag-input">
                <select
                data-testid="tag-input"
                id="tag-input"
                name="tag"
                value={ tag }
                onChange={ (event) => this.handleFormInput(event) }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>
            </li>
            <li>
              <label htmlFor="description-input">
                <input
                data-testid="description-input"
                type="text"
                id="description-input"
                name="description"
                placeholder="Descrição"
                value={ description }
                onChange={ (event) => this.handleFormInput(event) }
                />
              </label>
            </li>
            <li>
              <button
              type="button"
              onClick={ this.fetchAndSaveExpenses }
              >
              Adicionar despesa
              </button>
            </li>
          </ul>
        </form>
        <Expenses />
      </div>
);
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
    currencies: state.wallet.currencies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveExpenses: (cash, currency, methodInput, tagInput, infor) => dispatch(
      addExpenses(cash, currency, methodInput, tagInput, infor),
    ),
    fetchCurrency: () => dispatch(fetchCurrencies()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;
