import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class ExpenseTable extends React.Component {
  render() {
    const { expenses = 0, deleteExpenseAction } = this.props;
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses && expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  onClick={ () => deleteExpenseAction(expense.id) }
                  type="button"
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
                <button
                  data-testid="edit-btn"
                  type="button"
                >
                  Editar despesa
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (id) => (dispatch(deleteExpense(id))),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
