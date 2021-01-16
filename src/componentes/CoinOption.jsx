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
        <option>reaprendendo o codigo</option>
      </select>
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
