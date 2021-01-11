import React, { Component } from 'react';

class WalletPanel extends Component {
  render() {
    const expenseHeader = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <section>
        <table>
          <thead>
            <tr>
              {expenseHeader.map((item) => (
                <th key={ item }>{ item }</th>
              ))}
            </tr>
          </thead>
          <tbody>XA XA XABLAU</tbody>
        </table>
      </section>
    );
  }
}

export default WalletPanel;
