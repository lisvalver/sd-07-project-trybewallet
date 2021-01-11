import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction } from '../actions/index';

class TableExpenses extends React.Component {
  constructor() {
    super();
    this.tableExpenses = this.tableExpenses.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    const button = e.target;
    const td = button.parentNode;
    const tr = td.parentNode;

    const { deleteExpenses } = this.props;
    deleteExpenses(tr.id);
  }

  handleValorConvertido(element) {
    const { value, currency, exchangeRates } = element;
    const valorConvertido = parseInt(value, 10) * exchangeRates[currency].ask;
    return Math.round(valorConvertido * 100) / 100;
  }

  tableExpenses() {
    const { expenses } = this.props;
    const table = (
      <tbody>
        {expenses.map((element) => {
          const {
            id,
            description,
            tag,
            method,
            value,
            currency,
            exchangeRates,
          } = element;
          const currencyNowAsk = exchangeRates[currency].ask;
          return (
            <tr className="tbody-expense" id={ id } key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Math.round(currencyNowAsk * 100) / 100}</td>
              <td>{this.handleValorConvertido(element)}</td>
              <td>Real</td>
              <td>
                <button
                  type="submit"
                  onClick={ this.handleDelete }
                  data-testid="delete-btn"
                >
                  LIXO
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
    return table;
  }

  render() {
    const { expenses } = this.props;
    return (
      <table width="100%">
        <thead>
          <tr className="thead-expense">
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
        {expenses.length !== 0 && this.tableExpenses()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (id) => dispatch(deleteExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);

TableExpenses.propTypes = {
  deleteExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
