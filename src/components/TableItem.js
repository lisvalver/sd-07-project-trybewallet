import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { updateExpenses } from '../actions';

class TableItem extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem({ target }) {
    const { store } = this.props;
    const { wallet } = store;
    const { expenses } = wallet;
    const { update } = this.props;
    const item = target.parentElement.parentElement;
    const { id } = item;
    const updatedExpenses = expenses.filter((expense) => expense.id !== parseInt(id, 10));
    update(updatedExpenses);
  }

  render() {
    const { expense } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      currencies,
    } = expense;
    const myCurrency = currencies[`${currency}`];
    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currency }</td>
        <td>{ parseFloat(myCurrency.ask).toFixed(2) }</td>
        <td>{ (parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button type="button">
            Editar
          </button>
          <button
            type="button"
            onClick={ this.removeItem }
            data-testid="delete-btn"
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
  update: (array) => dispatch(updateExpenses(array)) });

export default connect(mapStateToProps, mapDispatchToProps)(TableItem);

TableItem.propTypes = {
  expense: propTypes.shape({
    id: propTypes.number,
    description: propTypes.string,
    tag: propTypes.string,
    method: propTypes.string,
    value: propTypes.number,
    currency: propTypes.string,
    currencies: propTypes.objectOf(propTypes.object),
  }),
  store: propTypes.shape({
    wallet: propTypes.shape({
      expenses: propTypes.arrayOf(propTypes.object),
    }),
  }),
}.isRequired;
