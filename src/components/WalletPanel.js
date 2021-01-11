import React, { Component } from 'react';

class WalletPanel extends Component {
  renderWalletHead() {
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
      <thead>
        <tr>
          {expenseHeader.map((item) => (
            <th key={ item }>{ item }</th>
          ))}
        </tr>
      </thead>
    );
  }

  renderWalletBody() {
    return (
      <tbody><tr><td>XA XA XABLAU</td></tr></tbody>
    );
  }

  render() {
    return (
      <section>
        <table>
          {this.renderWalletHead()}
          {this.renderWalletBody()}
        </table>
      </section>
    );
  }
}

export default WalletPanel;
