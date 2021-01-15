import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpenses } from '../actions';

class simpleTable extends Component {
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
      exchangeRates,
    } = expense;
    const myCurrency = exchangeRates[`${currency}`];
    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{myCurrency.name}</td>
        <td>{parseFloat(myCurrency.ask).toFixed(2)}</td>
        <td>{(parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
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
  store: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  update: (array) => dispatch(updateExpenses((array))),
});

export default connect(mapStateToProps, mapDispatchToProps)(simpleTable);

simpleTable.propTypes = {
  expense: propTypes.shape({
    id: propTypes.number,
    description: propTypes.string,
    tag: propTypes.string,
    method: propTypes.string,
    value: propTypes.string,
    currency: propTypes.string,
    exchangeRates: propTypes.objectOf(propTypes.object),
  }),
  store: propTypes.shape({
    wallet: propTypes.shape({
      expenses: propTypes.arrayOf(propTypes.object),
    }),
  }),
}.isRequired;
