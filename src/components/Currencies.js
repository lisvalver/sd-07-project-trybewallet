import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions/index';

class Currencies extends React.Component {
  componentDidMount() {
    const { currenciesLoad } = this.props;
    currenciesLoad();
  }

  render() {
    const { currencies, handleChange } = this.props;
    return (
      <label htmlFor="currency">
        Currency:
        <select
          defaultValue="USD"
          onChange={ handleChange }
          data-testid="currency-input"
          id="currency"
          name="currency"
        >
          <option>Escolha a Moeda</option>
          {currencies.map((currency) => (
            <option data-testid={ currency } value={ currency } key={ currency }>
              {currency}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesLoad: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);

Currencies.propTypes = {
  currenciesLoad: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
