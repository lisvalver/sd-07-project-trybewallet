import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderTableData = this.renderTableData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
  }

  // Nestas funções eu usei como base este site: https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
  renderTableData() {
    const { expenses } = this.props;
    return expenses.map((data, index) => {
      const { description, tag, method, value, currency, exchangeRates } = data;
      const {
        [currency]: { ask, name },
      } = exchangeRates;
      return (
        <tr key={ index }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{name}</td>
          <td>{(Math.round(ask * 100) / 100).toFixed(2)}</td>
          <td>{(Math.round(ask * value * 100) / 100).toFixed(2)}</td>
          <td>Real</td>
          <td />
        </tr>
      );
    });
  }

  renderTableHeader() {
    const header = [
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
    return header.map((key, index) => <th key={ index }>{key}</th>);
  }

  render() {
    return (
      <div>
        <h3>Tabela de despesas</h3>
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;
