import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../../actions';
import './WalletTable.css';

class WalletTable extends React.Component {
  constructor() {
    super();

    this.toConvertValue = this.toConvertValue.bind(this);
  }

  toConvertValue(expenseValue, exchange) {
    const updatedValue = Number(expenseValue) * Number(exchange);
    return updatedValue;
  }

  render() {
    const { tableData, deleteExpenseProps } = this.props;

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
      <table border="1" className="wallet-table">
        <tr>
          {tableHead.map((tableKey) => (
            <th
              className="wallet-table-head"
              key={ tableKey }
            >
              { tableKey }
            </th>))}
        </tr>
        {tableData.map((expense) => (
          <tr key={ expense.id }>
            <td className="wallet-table-data">{expense.description}</td>
            <td className="wallet-table-data">{expense.tag}</td>
            <td className="wallet-table-data">{expense.method}</td>
            <td className="wallet-table-data">{expense.value}</td>
            <td
              className="wallet-table-data"
            >
              {expense.exchangeRates[expense.currency].name}
            </td>
            <td
              className="wallet-table-data"
            >
              { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td className="wallet-table-data">
              { this.toConvertValue(
                expense.value, expense.exchangeRates[expense.currency].ask,
              ).toFixed(2) }
            </td>
            <td className="wallet-table-data">Real</td>
            <td className="wallet-table-data">
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => deleteExpenseProps(expense.id) }
                className="wallet-table-button"
              >
                X
              </button>
            </td>
          </tr>))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  tableData: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseProps: (id) => dispatch(deleteExpense(id)) });

WalletTable.propTypes = {
  tableData: PropTypes.objectOf(PropTypes.number).isRequired,
  deleteExpenseProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
