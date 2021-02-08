import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpensesToStore, editExpensesToStore } from '../actions';

class Table extends React.Component {
  constructor() {
    super();

    this.removeExpense = this.removeExpense.bind(this);
  }

  removeExpense(id) {
    const { delExpenses } = this.props;
    delExpenses(id);
  }

  render() {
    const { expenses, editExpenses } = this.props;
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const {
              id,
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates } = expense;

            const { [currency]: { name, ask } } = exchangeRates;
            const calcExchange = parseFloat(value) * parseFloat(ask);

            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ name }</td>
                <td>{ parseFloat(ask).toFixed(2) }</td>
                <td>{ parseFloat(calcExchange).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => editExpenses(id) }
                    className="btn btn-warning btn-sm"
                    data-testid="edit-btn"
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.removeExpense(id) }
                    data-testid="delete-btn"
                    className="btn btn-danger btn-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpenses: (id) => dispatch(delExpensesToStore(id)),
  editExpenses: (id) => dispatch(editExpensesToStore(null, id)),
});

Table.propTypes = {
  expenses: PropTypes.objectOf.isRequired,
  delExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
