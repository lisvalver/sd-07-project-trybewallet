import React from 'react';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.setInputState = this.setInputState.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      category: '',
    }
  }

  async fetchCurrencies() {
    const { getCurrencies } = this.props;

    try {
      const API = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(API);
      const json = await response.json();
      getCurrencies(
        Object.entries(json)
          .filter(currency => currency[0] !== 'USDT')
          .map(currency => currency[1])
      );
      // console.log(Object.entries(json)
      // .filter(currency => currency[0] !== 'USDT')
      // .map(currency => currency[1]));
    } catch (error) {
      throw new Error(error);
    }

  }

  setInputState({ target }) {
    this.setState({
      [target.name]: target.value,
    })
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  render() {
    const { email, currencies } = this.props;

    return (
      <div>
        <header>
          <h2 data-testid="email-field">
            Email:
            {email}
          </h2>
          <h2 data-testid="total-field">Despesa total: 0</h2>
          <h2 data-testid="header-currency-field">BRL</h2>
        </header>
        <form>
          <section>
            <label htmlFor="value-input">
              Valor da despesa
              <input
                onChange={this.setInputState}
                name="value"
                id="value-input"
                data-testid="value-input"
                type="number"
              />
            </label>
          </section>
          <section>
            <label htmlFor="description-input">
              Descrição da despesa
              <input
                onChange={this.setInputState}
                name="description"
                id="description-input"
                data-testid="description-input"
                type="text"
              />
            </label>
          </section>
          <section>
            <label htmlFor="description-input">
              Moeda
              <select onChange={this.setInputState} name="currency" data-testid="currency-input">
                {currencies.map(currency => {
                  return <option key={currency.code} data-testid={currency.code}>{currency.code}</option>
                })}
              </select>
            </label>
          </section>
          <section>
            <label htmlFor="">
              Método de pagamento
              <select onChange={this.setInputState} name="method" data-testid="method-input">
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
          </section>
          <section>
            <label htmlFor="">
              Categoria
              <select onChange={this.setInputState} name="category" data-testid="tag-input">
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
          </section>
          <section>
            <button>Adicionar despesa</button>
          </section>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (currencies) => dispatch(getCurrencies(currencies)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
