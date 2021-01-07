import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWallet } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.sendExpense = this.sendExpense.bind(this);
  }

  sendExpense() {
    console.log('envia depesa');
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{user}</div>
          <div data-testid="total-field">Despesa Total: R$0,00</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
        <form>
          <input
            type="number"
            data-testid="value-input"
            placeholder="Valor"
          />
          <input
            type="text"
            data-testid="description-input"
            placeholder="Descrição da Despesa"
          />
          <select data-testid="currency-input">
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
          <select data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao-de-credito">Cartão de crédito</option>
            <option value="cartao-de-debito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
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
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseToWallet: (wallet) => dispatch(addWallet(wallet)),
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
