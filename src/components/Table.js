import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userRemove } from '../actions/index';

const Table = () => {
  const expenses = useSelector((expense) => expense.wallet);

  const dispatch = useDispatch();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.expenses.map((userExpense) => (
            <tr key={ userExpense.id }>
              <td>{userExpense.description}</td>
              <td>{userExpense.method}</td>
              <td>{userExpense.tag}</td>
              <td>{userExpense.value}</td>
              <td>{userExpense.exchangeRates[userExpense.currency].name}</td>
              <td>
                {(userExpense.exchangeRates[userExpense.currency].ask)
                * (userExpense.value)}
              </td>
              <td>
                {parseFloat(userExpense.exchangeRates[userExpense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => dispatch(userRemove(userExpense.id)) }
                >
                  Apagar
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => dispatch(userRemove(userExpense.id)) }
                >
                  Editar despesa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
