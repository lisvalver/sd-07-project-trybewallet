import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.transformCurrencies = this.transformCurrencies.bind(this);
    this.updateNumberOfExpenses = this.updateNumberOfExpenses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      json: {},
      numberOfExpenses: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  // expenses: [{
  //   "id": 0,
  //   "value": "3",
  //   "description": "Hot Dog",
  //   "currency": "USD",
  //   "method": "Dinheiro",
  //   "tag": "Alimentação",
  //   "exchangeRates": {
  //     "USD": {
  //       "code": "USD",
  //       "name": "Dólar Comercial",
  //       "ask": "5.6208",
  //       ...
  //     },

  componentDidMount() {
    this.fetchCurrencies();
    this.updateNumberOfExpenses();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
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
    this.setState({ numberOfExpenses: expenses.lenght });
  }

  render() {
    const {
      json,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const currencies = this.transformCurrencies(json);
    console.log(currencies);
    return (
      <form>
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
            value={ method }
            onChange={ (e) => this.handleChange(e) }
            data-testid="method-input"
          >
            <option value="money">Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            value={ tag }
            onChange={ (e) => this.handleChange(e) }
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="fun">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ (e) => this.handleChange(e) }
            data-testid="description-input"
          />
        </label>
        <button type="submit">Adicionar Despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Form);
