import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  render() {
    const { login, currencies } = this.props;
    let arr = ['BRL', 'USD'];
    if (currencies !== undefined) {
      arr = currencies.currencies;
    }
    return (
      <div>
        <div className="App-header">
          <h1 data-testid="email-field">
            Email:
            {login}
          </h1>
          <h1 data-testid="total-field">0</h1>
          <h1 data-testid="header-currency-field">BRL</h1>
        </div>
        <div>
          <input data-testid="value-input" />
          <input data-testid="description-input" />
          <select data-testid="currency-input">
            {arr.map((currency) => (
              <option data-testid={ currency } key={ currency } value="valor1">
                {currency}
              </option>
            ))}
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
  currencies: state.wallet.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(getCurrencies()),
});

Wallet.propTypes = {
  login: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  updateCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
