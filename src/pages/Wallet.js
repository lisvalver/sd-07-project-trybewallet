import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return (<div>
      <header>
        <span data-testid="email-field">E-mail: { this.props.email } </span>
        <span data-testid="total-field"> Despesas total aqui devo somar as despesas: valor deve inicar 0 </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
      <form>
      <div>
      <label htmlFor="valueCash">Valor</label>
        <input
          id="valueCash"
          type="number"
          data-testid="value-input"
          pattern="\d*"
          min="0"
        />
      </div>
      <div>
        <label htmlFor="currency">Moeda</label>
        <select
          id="currency"
          data-testid="currency-input"
        >
          <option value="USD" data-testid="USD">USD</option>
          <option value="CAD" data-testid="CAD">CAD</option>
          <option value="EUR" data-testid="EUR">EUR</option>
          <option value="GBP" data-testid="GBP">GBP</option>
          <option value="ARS" data-testid="ARS">ARS</option>
          <option value="BTC" data-testid="BTC">BTC</option>
          <option value="LTC" data-testid="LTC">LTC</option>
          <option value="JPY" data-testid="JPY">JPY</option>
          <option value="CHF" data-testid="CHF">CHF</option>
          <option value="AUD" data-testid="AUD">AUD</option>
          <option value="CNY" data-testid="CNY">CNY</option>
          <option value="ILS" data-testid="ILS">ILS</option>
          <option value="ETH" data-testid="ETH">ETH</option>
          <option value="XRP" data-testid="XRP">XRP</option>
        </select>
      </div>
      <div>
      <label htmlFor="information">Descrição</label>
        <input
          id="information"
          type="text"
          data-testid="description-input"
        />
      </div>
      </form>
    </div>)
  }
}
const mapStateToProps = state => ({
  email: state.user.email});

export default connect(mapStateToProps)(Wallet);