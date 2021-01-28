import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpensesRow, editExpensesRow } from '../../actions';

class ExpenseTable extends Component {
  constructor(props) {
    super(props);
    this.createData = this.createData.bind(this);
    this.criaArray = this.criaArray.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
  }

  createData(id, description, tag, method, value, currency, exchangeRates) {
    const { name: exchange } = exchangeRates[currency];
    const { ask } = exchangeRates[currency];
    const converted = Math.round(parseFloat(value) * parseFloat(ask) * 100) / 100;
    const real = 'Real';
    return {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchange,
      converted,
      real,
      exchangeRates,
    };
  }

  criaArray(expenses) {
    return expenses.map(
      ({
        id,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates }) => this.createData(
        id,
        description,
        tag,
        method,
        value,
        currency,
        exchangeRates,
      ),
    );
  }

  deleteRow(id) {
    const { removeExpensesRow } = this.props;
    removeExpensesRow(id);
  }

  editRow(row) {
    const { editRow } = this.props;
    editRow(row);
    console.log(row);
  }

  render() {
    const { expenses } = this.props;
    const rows = this.criaArray(expenses);
    return (
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
          {rows.map((row, index) => (
            <tr key={ index }>
              <td>{row.description}</td>
              <td>{row.tag}</td>
              <td>{row.method}</td>
              <td>{row.value}</td>
              <td>{row.currency}</td>
              <td>{row.exchange}</td>
              <td>{row.converted}</td>
              <td>{row.real}</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteRow(row.id) }
                >
                  Excluir
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editRow(row) }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpensesRow: (rowId) => dispatch(deleteExpensesRow(rowId)),
  editRow: (editRow) => dispatch(editExpensesRow(editRow)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeExpensesRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
