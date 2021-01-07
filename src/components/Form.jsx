import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.transformCurrencies = this.transformCurrencies.bind(this);
    this.state = {
      json: {},
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
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

  render() {
    const { json } = this.state;
    const currencies = this.transformCurrencies(json);
    console.log(currencies);
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            name="valueInput"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currencyInput">
          Moeda:
          <select
            name="currencyInput"
            data-testid="currency-input"
          >
            {currencies.map((currency, index) => (
              <option
                key={ index }
                data-testid={ currency }
              >
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="methodInput">
          Método de Pagamento:
          <select
            name="methodInput"
            data-testid="method-input"
          >
            <option value="money">Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          Tag:
          <select
            name="tagInput"
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="fun">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <label htmlFor="descriptionInput">
          Descrição:
          <input
            type="text"
            name="descriptionInput"
            data-testid="description-input"
          />
        </label>
      </form>
    );
  }
}

export default Form;
