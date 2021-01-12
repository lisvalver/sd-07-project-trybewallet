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
      cash: 0,
      currency: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
      infor: '',
      value: 0,
      currenciesNames:[],
    };
  }
 
  componentDidMount(){
    this.fetchCurrenciesNames()
  }
  async fetchCurrenciesNames() {
      try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/all');
        const currencies = await response.json();
        const currenciesKeys = Object.keys(currencies);
        return this.setState({currenciesNames: currenciesKeys})
      } catch (error) {
        console.log(error);
      }
  }

  sumValue() {
    const { expenses } = this.props;
    const valueTotal = expenses.reduce((acc, item) => {
      const itemCurrency = item.currency;
      return (item.cash * item.exchangeRates[itemCurrency].ask) + acc;
    }, 0);
    const num = Math.round(valueTotal * 100);
    const numToFixed = (parseFloat(num).toFixed(2)) / 100;
    return this.setState({value: numToFixed})
  }

  async fetchAndSaveExpenses() {
    const { fetchCurrency, saveExpenses } = this.props;
    const { cash, currency, methodInput, tagInput, infor } = this.state;
    await fetchCurrency();
    saveExpenses(cash, currency, methodInput, tagInput, infor);
    this.sumValue();
  }

  handleFormInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email } = this.props;
    const { cash, currency, methodInput, tagInput, infor, value, currenciesNames } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            E-mail:
            { email }
          </span>
          <span>
            <span data-testid="total-field">
            Despesa Total: R$
              { value }
            </span>
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <form>
          <label htmlFor="cash">
            Valor:
            <input
              name="cash"
              id="cash"
              type="number"
              data-testid="value-input"
              pattern="\d*"
              min="0"
              value={ cash }
              onChange={ (event) => this.handleFormInput(event) }
            />
          </label>
          <label htmlFor="currency">
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ (event) => this.handleFormInput(event) }
            >
              { currenciesNames.map((element) => {
                return <option value={element} >{element}</option>
              })}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method-input"
              name="methodInput"
              value={ methodInput }
              onChange={ (event) => this.handleFormInput(event) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select
              data-testid="tag-input"
              id="tag-input"
              name="tagInput"
              value={ tagInput }
              onChange={ (event) => this.handleFormInput(event) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="infor">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="infor"
              name="infor"
              value={ infor }
              onChange={ (event) => this.handleFormInput(event) }
            />
          </label>
        </form>
        <button
          type="button"
          onClick={ this.fetchAndSaveExpenses }
        >
          Adicionar despesa
        </button>
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
