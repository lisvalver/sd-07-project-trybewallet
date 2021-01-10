import React, { Component } from 'react';
import propTypes from 'prop-types';

class CoinOption extends Component {
  render() {
    const { currency } = this.props;
    return (
      <option value={ currency } data-testid={ currency }>
        { currency }
      </option>
    );
  }
}

export default CoinOption;

CoinOption.propTypes = {
  currency: propTypes.string,
}.isRequired;