import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class CoinOption extends Component {
  constructor() {
    super();
    this.state = {
      currency: 'USD',
    };
  }

  render() {
    const { currencies } = this.props;
    return (
      <select
        id="currency"
        name="currency"
        value={ currencies }
        data-testid="currency-input"
      >
        { currencies.map((curr) => (
          (
            <option key={ curr } value={ curr } data-testid={ curr }>
                { curr }
            </option>
          )
        )) }
      </select>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

CoinOption.propTypes = {
  currency: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(CoinOption);
