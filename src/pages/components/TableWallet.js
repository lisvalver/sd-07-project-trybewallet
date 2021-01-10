import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  toGenerateTableBodyElements(dataTableBody) {
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
            // onClick={this._}
          >
            X
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    const { tableData } = this.props;
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
    console.log(Object.values(tableData));
    return (
      <table>
        <thead>
          <tr>{this.toGenerateTableHeadElements(tableHead)}</tr>
        </thead>
        <tbody>
          {this.toGenerateTableBodyElements(tableData)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  tableData: state.wallet.expenses,
});

TableWallet.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableWallet);
