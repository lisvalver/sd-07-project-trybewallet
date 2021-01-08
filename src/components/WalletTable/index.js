import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletTable extends React.Component {
  render() {
    const { tableData } = this.props;

    const tableHead = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor', 'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',

    ];
    return (
      <table border="1">
        <tr>
          {tableHead.map((tableKey) => (
            <th
              key={ tableKey }
            >
              { tableKey }
            </th>))}
        </tr>
        {tableData.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
            <td>
              { (Number(expense.value)
          * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
            </td>
            <td>Real</td>
          </tr>))}

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  tableData: state.wallet.expenses,
});

WalletTable.propTypes = {
  tableData: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(WalletTable);
