import PropTypes from 'prop-types';
import React from 'react';

class ForEachExpenses extends React.Component {
  render() {
    const { expense } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;

    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ Math.round(exchangeRates[currency].ask * 100) / 100 }</td>
        <td>{ Math.round(value * exchangeRates[currency].ask * 100) / 100 }</td>
        <td>Real</td>
      </tr>
    );
  }
}

ForEachExpenses.propTypes = ({
  expense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }),
}).isRequired;

export default ForEachExpenses;
