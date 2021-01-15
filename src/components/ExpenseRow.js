import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';

class ExpenseRow extends Component {
  constructor() {
    super();
    this.editMe = this.editMe.bind(this);
    this.deleteMe = this.deleteMe.bind(this);
  }

  editMe() {
    const { editIt, id } = this.props;
    editIt(id);
  }

  deleteMe() {
    const { deleteIt, id } = this.props;
    deleteIt(id);
  }

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
          <button type="button" data-testid="edit-btn" onClick={ this.editMe }>
            Editar
          </button>
          <button type="button" data-testid="delete-btn" onClick={ this.deleteMe }>
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteIt: (id) => dispatch(deleteExpense(id)),
  editIt: (id) => dispatch(editExpense(id)),
});

ExpenseRow.propTypes = ({
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  exchangeRates: PropTypes.shape().isRequired,
  deleteIt: PropTypes.func.isRequired,
  editIt: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(ExpenseRow);
