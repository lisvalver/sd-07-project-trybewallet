import React from 'react';
import PropTypes from 'prop-types';

export default function TableExpense({ expenses }) {
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
        { (expenses.length !== 0) && (
          expenses.map(({
            id,
            tag,
            value,
            method,
            currency,
            description,
            exchangeRates: { [currency]: { name, ask } },
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{name}</td>
              <td>{(+ask).toFixed(2)}</td>
              <td>{(+value * ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button data-testid="edit-btn" type="button">Editar despesa</button>
                <button data-testid="delete-btn" type="button">Excluir</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

TableExpense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
