import React from 'react';
import { connect } from 'react-redux';

function ExpensesTable({ expenses }) {
  const handleEditClick = () => {

  };

  const handleDeleteClick = () => {

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
              <td>{Number(e.exchangeRates[e.currency].ask * e.value) }</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => { handleEditClick(e.id); } }
                >
                  Editar despesa
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

const mapDispatchToProps = {

};

export default connect(null, mapDispatchToProps)(ExpensesTable);
