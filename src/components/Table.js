import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction, editExpenseAction } from '../actions';

class Table extends Component {
  render() {
    const { expenses, deleteExpense, editExpense } = this.props;
    let totalPriceExpenses = 0;
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        {expenses.map((expense, index) => {
          const {
            description,
            tag,
            method,
            currency,
            value,
            id,
            exchangeRates,
          } = expense;

          const editObjExpense = {
            description,
            tag,
            method,
            currency,
            value,
            id,
            index,
            exchangeRates,
          };

          totalPriceExpenses = value * exchangeRates[currency].ask;

          return (
            <tbody key={ description }>
              <tr>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>
                  {Number(exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>{totalPriceExpenses.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(index) }
                  >
                    remover
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editExpense(editObjExpense) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (indexExpenseToDelete) => {
    dispatch(deleteExpenseAction(indexExpenseToDelete));
  },
  editExpense: (editObjExpense) => dispatch(editExpenseAction(editObjExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};
