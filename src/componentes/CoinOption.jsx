import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { currencyToStore } from '../actions'

class CoinOption extends Component {
  constructor() {
    super();
    this.state = {
      currency: '',
    };

    this.changeCurrency = this.changeCurrency.bind(this);
  }

  changeCurrency({ target }) {
    const { currencyChoosed } = this.props;
    this.setState({ currency: target.value });
    currencyChoosed(target.value);
  }

  render() {
    const { currency } = this.state;
    const { currencies } = this.props;
    const coinsOptions = Object.keys(currencies).filter((curr) => curr !== 'USDT');
    return (
      <div>
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.changeCurrency }
          value={ currency }
        >
          {coinsOptions.map((element, index) => (
            <option data-testid={ element } key={ index } value={ element }>
              {element}
            </option>
          ))};
        </select>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencyChoosed: (payload) => dispatch(currencyToStore(payload)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

CoinOption.propTypes = {
  currency: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(CoinOption);
