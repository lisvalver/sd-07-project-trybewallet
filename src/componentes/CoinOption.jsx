import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class CoinOption extends Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
    };
  }

  render() {
    const { currency } = this.state;
    const { currencies } = this.props;
    const coinsOptions = Object.keys(currencies).filter((curr) => curr !== 'USDT');
    return (
      <div>
      <select
                data-testid="currency-input"
                id="currency"
                onChange={ (event) => this.setState({ currency: event.target.value }) }
                value={ currency }
              >
                {coinsOptions.map((element, index) => (
                  <option data-testid={ element } key={ index } value={ element }>
                    {element}
                  </option>
                ))}
                ;
              </select>
        </div>
    );
  }
}

//action.payload

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

CoinOption.propTypes = {
  currency: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(CoinOption);
