import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(id) {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

  render() {
    const { expenses } = this.props;
    return (
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
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                {Number(
                  expense.value * expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => this.deleteItem(expense.id) }
                  data-testid="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(deleteExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
