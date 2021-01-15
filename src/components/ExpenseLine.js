import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ExpenseLine extends Component {
  render() {
    const { expense } = this.props;
    const {
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;

    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ Math.round(exchangeRates[currency].ask * 100) / 100 }</td>
        <td>{ value * exchangeRates[currency].ask }</td>
        <td>Real</td>
      </tr>
    );
  }
}

ExpenseLine.propTypes = {
  expense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(
      PropTypes.object,
    ),
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default ExpenseLine;
