import React from 'react';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }

  async fetchCurrencies() {
    const { getCurrencies } = this.props;

    try {
      const API = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(API);
      const json = await response.json();
      getCurrencies(
        Object.entries(json).filter(currency => currency[0] !== 'USDT')
        );
      console.log(Object.entries(json).filter(currency => currency[0] !== 'USDT'));
    } catch (error) {
      throw new Error(error);
    }

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
            { email }
          </h2>
          <h2 data-testid="total-field">Despesa total: 0</h2>
          <h2 data-testid="header-currency-field">BRL</h2>
        </header>
        <form>
          <section>
            <label htmlFor="value-input">
              Valor da despesa
              <input
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
                id="description-input"
                data-testid="description-input"
                type="text"
              />
            </label>
          </section>
          <section>
            <label htmlFor="description-input">
              Moeda
              <select data-testid="currency-input">
                { currencies.map(currency => {
                  return <option key={currency[0]} data-testid={currency[0]}>{currency[0]}</option>
                }) }
              </select>
            </label>
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
