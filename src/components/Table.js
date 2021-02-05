import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.handleDelet = this.handleDelet.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
  }

  //   handleEdit(expenseID) {

  //   }

  handleDelet(expenseID) {
    const { deleteExpense } = this.props;
    deleteExpense(expenseID);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
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
          </thead>
          <tbody>
            {expenses.map((expense) => (
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
                  {parseFloat(
                    expense.value * expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  {/* <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.handleEdit(expense.id) }
                  >
                    Editar
                  </button> */}
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleDelet(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
      description: PropTypes.string,
      exchangeRates: PropTypes.objectOf(PropTypes.object),
      method: PropTypes.string,
      tag: PropTypes.string,
      value: PropTypes.number,
      id: PropTypes.number,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenseID) => dispatch(deleteExpenses(expenseID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
