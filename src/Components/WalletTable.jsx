import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletExpense as deletExpenses, editExpense } from '../actions/wallet.action';

class Table extends React.Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(expenseToRemove) {
    const { deletExpense, expenses } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== expenseToRemove.id);
    deletExpense(newExpenses);
  }

  handleEdit(expenseToEdit) {
    const { editExpenses } = this.props;
    // const expenseEdit = expenses.filter((expense) => expense.id === expenseToEdit.id);
    editExpenses(expenseToEdit);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-register">
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
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {parseFloat(
                    expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2)}
                </td>
                <td>
                  {
                    (parseFloat(
                      expense.exchangeRates[expense.currency].ask,
                    ) * parseFloat(expense.value)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleRemove(expense) }
                    className="btn-remove"
                  >
                    Remover
                  </button>
                  -
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.handleEdit(expense) }
                    className="btn-edit"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deletExpense: (expense) => dispatch(deletExpenses(expense)),
  editExpenses: (expense) => dispatch(editExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  deletExpense: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
