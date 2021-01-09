import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeAExpense } from '../actions';

class Tabela extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(expenseToRemove) {
    const { removeOneExpense, expenses } = this.props;
    // console.log(expenses);
    // console.log(expenseToRemove);
    const newExpenses = expenses.filter((expense) => expense.id !== expenseToRemove.id);
    // console.log(newExpenses);
    removeOneExpense(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    // console.log(expenses);
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
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <th>{expense.description}</th>
                  <th>{expense.category}</th>
                  <th>{expense.method}</th>
                  <th>{expense.value}</th>
                  <th>{expense.name_currency}</th>
                  <th>{expense.ask}</th>
                  <th>
                    {
                      (parseFloat(expense.ask) * parseFloat(expense.value)).toFixed(2)
                    }
                  </th>
                  <th>Real</th>
                  <th>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.handleRemove(expense) }
                    >
                      Remover
                    </button>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeOneExpense: (expense) => dispatch(removeAExpense(expense)),
});

Tabela.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeOneExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
