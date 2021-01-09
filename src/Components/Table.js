import React, { Component } from 'react';

class Table extends Component {
  render() {
    const name = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
    ];

    return (
      <div>
        <table>
          <thead>
            <tr>
              {name.map((tipos) => (
                <th key={ tipos }>
                  {' '}
                  {tipos}
                  {' '}
                </th>
              ))}
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {name.map((tipos) => (
            <td key={ tipos }> Ainda não acrecentado </td>
          ))}
          <td>
            <button data-testid="edit-btn" type="button">Editar</button>
          </td>
          <td>
            <button data-testid="delete-btn" type="button">Excluir</button>
          </td>
        </table>
      </div>
    );
  }
}

export default Table;
