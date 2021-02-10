import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExp, decrementAmount, editAction } from '../../actions';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  editExpense({ id }) {
    const { editProp } = this.props;
    editProp(id);
  }

  deleteExpense(item) {
    const { deleteAction, expenses, amount } = this.props;
    const { exchangeRates, value } = item;
    const currentExpense = expenses.filter((expense) => expense.id !== item.id);
    deleteAction(currentExpense);
    let valueExpense = parseFloat(exchangeRates[item.currency].ask) * parseFloat(value);
    valueExpense = parseFloat(valueExpense.toFixed(2));
    amount(valueExpense);
  }

  render() {
    const { expenses } = this.props;
    return (
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
        <tbody>
          {expenses.map((item, index) => (
            <tr key={ index }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>{(item.exchangeRates[item.currency].ask * item.value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  id={ item.id }
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.editExpense(item) }
                >
                  Editar
                </button>
                <button
                  id={ item.id }
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.deleteExpense(item) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteAction: (currentExpense) => (dispatch(deleteExp(currentExpense))),
  amount: (value) => (dispatch(decrementAmount(value))),
  editProp: (id) => (dispatch(editAction(id))),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
  deleteAction: PropTypes.func.isRequired,
  amount: PropTypes.func.isRequired,
  editProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
