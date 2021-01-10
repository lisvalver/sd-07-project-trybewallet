import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { excludeExpense, updateExpenses } from '../actions';

class Table extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(id) {
    const { deleteExpense } = this.props;
    await deleteExpense(id);
    this.updateHelper();
  }

  updateHelper() {
    const { expenses, updateExpensesProps } = this.props;
    const totalExpenses = expenses.reduce((acc, expense) => {
      const { currency } = expense;
      const exchangeRate = parseFloat(expense.exchangeRates[currency].ask);
      return acc + (expense.value * exchangeRate);
    }, 0);
    updateExpensesProps(Number(totalExpenses));
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
            { expenses.map((e) => (
              <tr
                key={ e.id }
              >
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ e.value }</td>
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>{Number(e.exchangeRates[e.currency].ask * e.value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(e.id) }
                  >
                    X
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

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(excludeExpense(id)),
  updateExpensesProps: (expenses) => dispatch(updateExpenses(expenses)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  deleteExpense: propTypes.func.isRequired,
  updateExpensesProps: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
