import React from 'react';
import { useSelector } from 'react-redux';

const Table = () => {
  const wallet = useSelector((state) => state.wallet);
  // const expenses = wallet.expenses
  // console.log(wallet.expenses)

  if (wallet.expenses.length === 0) return (<h1>Carregando...</h1>);

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
        { wallet.expenses.map(({
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
            <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
            <td>{ (exchangeRates[currency].ask * value).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
              >
                Excluir
              </button>
            </td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
