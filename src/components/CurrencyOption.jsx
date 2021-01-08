import React, { Component } from 'react';
import propTypes from 'prop-types';

class CurrencyOption extends Component {
  render() {
    const { currency } = this.props;
    return (<option value={ currency } data-testid={ currency }>{ currency }</option>);
  }
}

export default CurrencyOption;

CurrencyOption.propTypes = {
  currency: propTypes.string,
}.isRequired;
