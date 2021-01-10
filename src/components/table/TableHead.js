import React from 'react';

class TableHead extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <th key="Descrição">Descrição</th>
          <th key="Tag">Tag</th>
          <th key="Método de pagamento">Método de pagamento</th>
          <th key="Valor">Valor</th>
          <th key="Moeda">Moeda</th>
          <th key="Câmbio utilizado">Câmbio utilizado</th>
          <th key="Valor convertido">Valor convertido</th>
          <th key="Moeda de conversão">Moeda de conversão</th>
          <th key="Editar/Excluir">Editar/Excluir</th>
        </tr>
      </thead>
    );
  }
}

export default TableHead;
