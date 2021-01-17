import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <table>
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
        <tr>
          <td>John</td>
          <td>Doe</td>
        </tr><tr>
          <td>John</td>
          <td>Doe</td>
          <td>Doe</td>
          <td>Doe</td>
          <td>Doe</td>
        </tr><tr>
          <td>John</td>
          <td>Doe</td>
        </tr>
      </table>
    );
  }
}

export default Table;