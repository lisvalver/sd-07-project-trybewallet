import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../actions';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { fetchMyCurrencyList } = this.props;
    fetchMyCurrencyList();
  }

  render() {
    const { userLogin, currencyList } = this.props;
    const filterCurrencies = Object.keys(currencyList)
      .filter((currency) => currency !== 'USDT');
    console.log(currencyList);
    return (
      <div>
        <div>
          <span data-testid="email-field">{userLogin}</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div>
          <form>
            <label htmlFor="expense">
              Valor da despeza:
              <input type="text" id="expense" data-testid="value-input" />
            </label>
            <label htmlFor="description">
              Descrição da despeza:
              <input type="text" id="description" data-testid="description-input" />
            </label>
            <label htmlFor="currency">
              Selecione o Câmbio
              <select data-testid="currency-input" id="currency">
                {Object.keys(filterCurrencies).map((currency, index) => {
                  if (currency !== 'USDT') {
                    return (
                      <option
                        data-testid={ currency }
                        key={ index }
                        value={ currency }
                      >
                        {currency}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user.email,
  currencyList: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyCurrencyList: () => dispatch(action.fetchingAPI),
});

Wallet.propTypes = {
  userLogin: PropTypes.string.isRequired,
  fetchMyCurrencyList: PropTypes.func.isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
