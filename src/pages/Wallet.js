import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            E-mail:
            { email }
          </span>
          <span data-testid="total-field">
            Despesa Total:
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <form>
          <label htmlFor="cash">
            Valor:
            <input
              id="cash"
              type="number"
              data-testid="value-input"
              pattern="\d*"
              min="0"
            />
          </label>
          <label htmlFor="currency">
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
          </label>
          <label htmlFor="infor">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="infor"
            />
          </label>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email });

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;
