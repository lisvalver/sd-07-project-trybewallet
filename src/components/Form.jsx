import React from 'react';
import { connect } from 'react-redux';
import fetchCurrency from '../services/API';

class Form extends React.Component {
  constructor() {
    super();
    // this.currencyOptions = this.currencyOptions.bind(this);
    this.state = {
      currencies: [],
      methodOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagOptions: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const currency = await fetchCurrency();
    const currenciesL = Object.keys(currency);
    const currencyList = currenciesL.filter((element) => element !== 'USDT');
    this.setState({ currencies: currencyList });
  }

  render() {
    const { currencies, methodOptions, tagOptions } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input type="text" data-testid="value-input" id="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
          />
          <select
            name="currency"
            className="currency-input"
            data-testid="currency-input"
          >
            <option selected>Selecione a sua moeda</option>
            {currencies.map((c) => (
              <option key={ c } data-testid={ c }>{c}</option>
            ))}
          </select>
          <select
            name="method"
            className="method-input"
            data-testid="method-input"
          >
            <option selected>Selecione o método de pagamento</option>
            {methodOptions.map((m) => (
              <option key={ m } data-testid={ m }>{m}</option>
            ))}
          </select>
          <select
            name="tag"
            className="tag-input"
            data-testid="tag-input"
          >
            <option selected>Selecione a categoria da despesa</option>
            {tagOptions.map((t) => (
              <option key={ t } data-testid={ t }>{t}</option>
            ))}
          </select>
        </label>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  walletCurrencyDispatch: (currency) => dispatch(walletCurrency(currency)),
});

export default connect(null, mapDispatchToProps)(Form);
