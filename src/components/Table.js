/* import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props.arrayOfExpenses.wallet;
    if (expenses.length >= 0)
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
              {expenses.map(
                ({
                  id,
                  description,
                  currency,
                  value,
                  paymentMethod,
                  tag,
                  exchange,
                }) => (
                  <tr key={id}>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{paymentMethod}</td>
                    <td>{value}</td>
                    <td>{currency}</td>
                    <td>
                      {(
                        Number(value) * Number(exchange[currency].ask)
                      ).toFixed(2)}
                    </td>
                    <td>{Number(exchange[currency].ask).toFixed(2)}</td>
                    <td>Real</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  arrayOfExpenses: state,
});

export default connect(mapStateToProps)(Table); */
