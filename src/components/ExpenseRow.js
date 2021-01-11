import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {} from '../actions';

class ExpenseRow extends Component {
  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    } = this.props;
    const convertedValue = parseFloat((exchangeRates[currency].ask * value).toFixed(2));
    const convertedAsk = parseFloat(parseFloat(exchangeRates[currency].ask).toFixed(2));
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{convertedAsk}</td>
        <td>{convertedValue}</td>
        <td>Real</td>
        <td>
          <button type="button">
            Editar
          </button>
          <button type="button">
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

// const mapStateToProps = (state) => ({
// });

// const mapDispatchToProps = (dispatch) => ({
// });

ExpenseRow.propTypes = ({
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  exchangeRates: PropTypes.shape().isRequired,
});

export default ExpenseRow;
// export default connect(mapStateToProps, mapDispatchToProps)(ExpenseRow);
