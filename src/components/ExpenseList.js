import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteExpense, editExpenseStart } from '../actions';

class ExpenseList extends Component {
  deleteExpenses({ target: { value } }) {
    const { expenses, delExpense } = this.props;
    const newExpenses = expenses.filter((item) => item.id !== Number(value));
    delExpense(newExpenses);
  }

  editExpenses({ target: { value } }) {
    const { editStart } = this.props;
    editStart(value);
  }

  render() {
    const { expenses } = this.props;

    return (
      <div>
        <div
          style={ {
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: 'gray',
            height: 50,
            alignItems: 'center',
          } }
        >
          <span>Descrição</span>
          <span>Tag</span>
          <span>Método de pagamento</span>
          <span>Valor</span>
          <span>Moeda</span>
          <span>Câmbio utilizado</span>
          <span>Valor convertido</span>
          <span>Moeda de conversão</span>
          <span>Editar/Excluir</span>
        </div>
        <div>
          {expenses.map((expense) => (
            <div
              key={ expense.id }
              style={ {
                display: 'flex',
                justifyContent: 'space-around',
                height: 50,
                alignItems: 'center',
              } }
            >
              <span role="cell">
                {expense.description}
              </span>
              <span role="cell">
                {expense.tag}
              </span>
              <span role="cell">
                {expense.method}
              </span>
              <span role="cell">
                {expense.value}
              </span>
              <span role="cell">
                {Object.values(expense.exchangeRates)
                  .filter((item) => item.code === expense.currency)[0].name}
              </span>
              <span role="cell">
                {Number(Object.values(expense.exchangeRates)
                  .filter((item) => item.code === expense.currency)[0].ask).toFixed(2)}
              </span>
              <span role="cell">
                {Number((Object.values(expense.exchangeRates).filter(
                  (item) => item.code === expense.currency,
                )[0].ask) * expense.value).toFixed(2)}
              </span>
              <span role="cell">
                Real
              </span>
              <button
                type="button"
                value={ expense.id }
                data-testid="edit-btn"
                onClick={ (e) => this.editExpenses(e) }
              >
                Editar
              </button>
              <button
                type="button"
                value={ expense.id }
                data-testid="delete-btn"
                onClick={ (e) => this.deleteExpenses(e) }
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExpenses: PropTypes.func,
  editExpenseStart: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { expenses, currencies } }) => ({
  expenses,
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (expense) => dispatch(deleteExpense(expense)),
  editStart: (edit) => dispatch(editExpenseStart(edit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
