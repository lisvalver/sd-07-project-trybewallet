import React from 'react';
import { connect } from 'react-redux';
import ForEachExpenses from './ForEachExpenses';

class Table extends React.Component {
  render() {

    const { expenses } = this.props;
    const renderLines = (
      <tbody>
        {expenses
          .map((expense, index) => <ForEachExpenses key={ index } expense={ expense } />)}
      </tbody>
    );

    const noRenderLines = (
        <tr>
          <td>Without Expenses</td>
        </tr>
    );

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
        { expenses.length > 0 ? renderLines : noRenderLines }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);