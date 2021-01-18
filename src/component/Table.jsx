import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { updateExpenses, editingExpenseAction } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem({ target }) {
    const { store, update } = this.props;
    const { wallet } = store;
    const { expenses } = wallet;
    const item = target.parentElement.parentElement;
    const { id } = item;
    const updatedExpenses = expenses.filter((expense) => expense.id !== parseInt(id, 10));
    update(updatedExpenses);
  }

  render() {
    const { expense, inEditing, editExpense } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;
    const myCurrency = exchangeRates[`${currency}`];
    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ value }</td>
        <td>{ method }</td>
        <td>{ tag }</td>
        <td>{ parseFloat(myCurrency.ask).toFixed(2) }</td>
        <td>{ myCurrency.name }</td>
        <td>{ (parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => editExpense(id, true) }
          >
            Editar
          </button>
        </td>
        <td>
          <button
            type="button"
            onClick={ this.removeItem }
            data-testid="delete-btn"
            disabled={ inEditing }
          >
            Apagar
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapDispatchToProps = (dispatch) => ({
  update: (array) => dispatch(updateExpenses(array)),
  editExpense: (id) => dispatch(editingExpenseAction(id, true)),
});

Table.propTypes = {
  add: propTypes.func.isRequired,
  store: propTypes.shape({
    wallet: propTypes.shape({
      expenses: propTypes.arrayOf(propTypes.object),
    }),
    user: propTypes.shape({
      email: propTypes.string,
    }),
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
