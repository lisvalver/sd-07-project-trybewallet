import React from 'react';

class Tabela extends React.Component {
  render() {
    return (
      <div>
        <table border="1" width="400">
          <tr>
            <th>descricao</th>
            <th>tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
          </tr>
        </table>
      </div>
    );
  }
}
export default Tabela;
