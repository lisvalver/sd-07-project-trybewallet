import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../services';
import { fetchCurrencies } from '../actions';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currentCurrency: 'BRL',
    };
  }

  async componentDidMount() {
    const { actionFetchCurrencies } = this.props;
    const data = await getCurrencies();
    const currencies = data.filter((currency) => currency !== 'USDT');
    actionFetchCurrencies({ currencies });
  }

  render() {
    const { currencies } = this.props;
    const { total, currentCurrency } = this.state;
    return (
      <div>
        <div>
          <h4 data-testid="total-field">
            {total}
          </h4>
        </div>
        <div>
          <h4 data-testid="header-currency-field">
            {currentCurrency}
          </h4>
        </div>
        <div>
          <select data-testid="currency-input">
            {currencies.map((currency) => (
              <option
                key={ currency }
                data-testid={ currency }
                value={ currency }
              >
                {currency}
              </option>))}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  actionFetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  // expenses: PropTypes.arrayOf(String).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actionFetchCurrencies: (e) => dispatch(fetchCurrencies(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
