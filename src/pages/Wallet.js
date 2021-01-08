import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWalletExpenses, addWalletCurrencies, addWalletExpenses } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.sendExpense = this.sendExpense.bind(this);
    // this.state = {
    //   value: 0,
    //   description: '',
    //   currency: '',
    //   method: '',
    //   tag: '',
    // };
  }

  async sendExpense() {
    const { fetchCurrencies, addCurrencies, wallet } = this.props;
    const currency = await fetchCurrencies();
    console.log(currency);
    addCurrencies(currency);
    console.log(wallet);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{user}</div>
          <div data-testid="total-field">0</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              name="valor"
            />
          </label>
          <label htmlFor="despesa">
            Descrição da Despesa:
            <input
              type="text"
              data-testid="description-input"
              name="despesa"
            />
          </label>
          <label htmlFor="moeda">
            <select name="moeda" data-testid="currency-input">
              <option value="USD" data-testid="USD">
                USD
              </option>
              <option value="CAD" data-testid="CAD">
                CAD
              </option>
              <option value="EUR" data-testid="EUR">
                EUR
              </option>
              <option value="GBP" data-testid="GBP">
                GBP
              </option>
              <option value="ARS" data-testid="ARS">
                ARS
              </option>
              <option value="BTC" data-testid="BTC">
                BTC
              </option>
              <option value="LTC" data-testid="LTC">
                LTC
              </option>
              <option value="JPY" data-testid="JPY">
                JPY
              </option>
              <option value="CHF" data-testid="CHF">
                CHF
              </option>
              <option value="AUD" data-testid="AUD">
                AUD
              </option>
              <option value="CNY" data-testid="CNY">
                CNY
              </option>
              <option value="ILS" data-testid="ILS">
                ILS
              </option>
              <option value="ETH" data-testid="ETH">
                ETH
              </option>
              <option value="XRP" data-testid="XRP">
                XRP
              </option>
            </select>
          </label>
          <label htmlFor="metodo-pagamento">
            <select name="metodo-pagamento" data-testid="method-input">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select name="tag" data-testid="tag-input">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            id="button-enter"
            onClick={ this.sendExpense }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (wallet) => dispatch(fetchWalletExpenses(wallet)),
  addExpenses: (wallet) => dispatch(addWalletExpenses(wallet)),
  addCurrencies: (wallet) => dispatch(addWalletCurrencies(wallet)),
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  addCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.number.isRequired,
    expenses: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
