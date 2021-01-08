import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <table className="table-register">
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Metodo de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Cambio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </table>
    );
  }
}

export default Table;
