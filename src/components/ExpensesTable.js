// Não alterei nomes para melhor eu Compreender { meritos Alvaro }
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { saveNewExpenses } from '../actions';

function ExpensesTable({ expenses, handleEditClick, saveExpenses }) {
  const handleDeleteClick = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    saveExpenses(newExpenses);
  };

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
          {expenses.map((e) => (
            <tr key={ e.id }>
              <td>{e.description}</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{e.value}</td>
              <td>{ e.exchangeRates[e.currency].name }</td>
              <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
              <td>{Number(e.exchangeRates[e.currency].ask * e.value).toFixed(2) }</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => { handleEditClick(e.id); } }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => { handleDeleteClick(e.id); } }
                >
                  Excluir despesa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(saveNewExpenses(expenses)),
});

ExpensesTable.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  handleEditClick: propTypes.func.isRequired,
  saveExpenses: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpensesTable);
