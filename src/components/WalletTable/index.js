import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../../actions';

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
              { this.toConvertValue(
                expense.value, expense.exchangeRates[expense.currency].ask,
              ).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => deleteExpenseProps(expense.id) }

              >
                Excluir
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
