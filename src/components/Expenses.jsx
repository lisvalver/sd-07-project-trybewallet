import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Expenses extends React.Component {
  render() {
    return (
      <div>
        <h2>Tabela de Gastos</h2>
        <table>
          <tbody>
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
            <tr key="id">
              <td>Descrição</td>
              <td>Tag</td>
              <td>Método de pagamento</td>
              <td>Valor</td>
              <td>Moeda</td>
              <td>Câmbio utilizado</td>
              <td>Valor convertido</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Expenses;
