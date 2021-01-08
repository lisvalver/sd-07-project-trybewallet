import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExpenses } from '../actions';

class TableItem extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem({ target }) {
    const { expenses } = this.props.store.wallet;
    const { update } = this.props;
    const item = target.parentElement.parentElement;
    const id = item.id;
    const updatedExpenses = expenses.filter((expense) => expense.id !== parseInt(id));
    update(updatedExpenses);
  }
  
  render() {
    // cambio utilizado, valor convertido
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates
    } = this.props.expense;
    const myCurrency = exchangeRates[`${currency}`];
    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ myCurrency.name }</td>
        <td>{ parseFloat(myCurrency.ask).toFixed(2) }</td>
        <td>{ (parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            onClick={ this.removeItem }
            data-testid="delete-btn"
          >Apagar</button></td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapDispatchToProps = (dispatch) => ({
  update: (array) => dispatch(updateExpenses(array))});

export default connect(mapStateToProps, mapDispatchToProps)(TableItem);
