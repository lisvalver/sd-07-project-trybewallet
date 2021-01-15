import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delExpense } from '../actions';

class ExpenseLine extends Component {
  render() {
    const { expense, delExpenseAct } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;

    const delExpenseFunc = ({ target }) => {
      delExpenseAct(parseInt(target.parentElement.parentElement.id, 10));
    };

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
});

export default connect(null, mapDispatchToProps)(ExpenseLine);
