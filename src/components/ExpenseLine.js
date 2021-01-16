import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delExpense, editRequest } from '../actions';

class ExpenseLine extends Component {
  render() {
    const { expense, delExpenseAct, edtRequest } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;

    const edtRequestFunc = ({ target }) => {
      edtRequest(parseInt(target.parentElement.parentElement.id, 10), true);
    };

    const delExpenseFunc = ({ target }) => {
      delExpenseAct(parseInt(target.parentElement.parentElement.id, 10));
    };

    const multiplierHundred = 100;
    const exchangeValue = Math
      .round(exchangeRates[currency].ask * multiplierHundred) / multiplierHundred;
    const convertedValue = Math
      .round(value * exchangeRates[currency].ask * multiplierHundred) / multiplierHundred;

    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ (exchangeValue).toFixed(2) }</td>
        <td>{ (convertedValue).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            id="edit-btn"
            data-testid="edit-btn"
            onClick={ edtRequestFunc }
          >
            Edt
          </button>
        </td>
        <td>
          <button
            type="button"
            id="delete-btn"
            data-testid="delete-btn"
            onClick={ delExpenseFunc }
          >
            Del
          </button>
        </td>
      </tr>
    );
  }
}

ExpenseLine.propTypes = ({
  delExpenseAct: PropTypes.func,
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

const mapDispatchToProps = (dispatch) => ({
  delExpenseAct: (id) => dispatch(delExpense(id)),
  edtRequest: (id, boolean) => dispatch(editRequest(id, boolean)),
});

export default connect(null, mapDispatchToProps)(ExpenseLine);
