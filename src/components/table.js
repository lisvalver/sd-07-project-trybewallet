import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, edit, total } from '../actions';

function Table() {
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  const deleteExpense = (id) => {
    dispatch(remove(id));
    dispatch(total());
  };

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
        { expenses.map(({
          id,
          value,
          currency,
          method,
          tag,
          description,
          exchangeRates,
        }) => (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ exchangeRates[currency].name }</td>
            <td>
              { Number(exchangeRates[currency].ask).toFixed(2) }
            </td>
            <td>{ (exchangeRates[currency].ask * value).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => deleteExpense(id) }
              >
                Excluir
              </button>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => dispatch(edit(id)) }
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* https://github.com/tryber/sd-07-project-trybewallet/pull/136
https://github.com/tryber/sd-07-project-trybewallet/pull/135/files
https://github.com/tryber/sd-07-project-trybewallet/pull/126/files
plantão do zambeli + origamid Redux Toolkit */

export default Table;
