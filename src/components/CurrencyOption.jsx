import React, { Component } from 'react';

class CurrencyOption extends Component {
  render() {
    const { currency } = this.props;
      return (<option value={ currency } data-testid={ currency }>{ currency }</option>);
  }
}

export default CurrencyOption;
