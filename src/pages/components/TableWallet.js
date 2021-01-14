import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../../store/ducks/wallet/actions';

class TableWallet extends Component {
  constructor() {
    super();
    this.toConvertExchangeValue = this.toConvertExchangeValue.bind(this);
    this.toGenerateTableHeadElements = this.toGenerateTableHeadElements.bind(this);
    this.toGenerateTableBodyElements = this.toGenerateTableBodyElements.bind(this);
  }

  toConvertExchangeValue(initialValue, convertedValue) {
    return Number(initialValue) * Number(convertedValue);
  }

  toGenerateTableHeadElements(dataTableHead) {
    return dataTableHead.map((item) => (
      <th key={ item }>{item}</th>
    ));
  }

  toGenerateTableBodyElements(dataTableBody, deleteFunc) {
    // const { deleteExpense } = this.props;
    return Object.values(dataTableBody).map((item) => (
      <tr key={ item.id }>
        <td>{item.description}</td>
        <td>{item.tag}</td>
        <td>{item.method}</td>
        <td>{item.value}</td>
        <td>{item.exchangeRates[item.currency].name}</td>
        <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
        <td>
          {
            this.toConvertExchangeValue(item.value,
              item.exchangeRates[item.currency].ask).toFixed(2)
          }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteFunc(item) }
          >
            X
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    const { tableData, deleteExpenseProps } = this.props;
    const tableHead = [
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
      <table>
        <thead>
          <tr>{this.toGenerateTableHeadElements(tableHead)}</tr>
        </thead>
        <tbody>
          {this.toGenerateTableBodyElements(tableData, deleteExpenseProps)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  tableData: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseProps: (id) => dispatch(deleteExpense(id)),
});

TableWallet.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
