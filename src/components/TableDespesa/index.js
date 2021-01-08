import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteExpensesAction,
  editExpense,
  expensesCurrencyAction,
} from '../../actions';

class TableDespesa extends React.Component {
  constructor(props) {
    super(props);
    this.initEditing = this.initEditing.bind(this);
  }

  initEditing(event, id) {
    event.preventDefault();
    const { editExpenses, expenses, setExpense } = this.props;
    editExpenses();
    const expenseForEditing = expenses.find((expen) => expen.id === id);
    setExpense(expenseForEditing);
  }

  render() {
    const { expenses, deleteExpenses } = this.props;
    return (
      <div>
        <div>
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
              {expenses.map(
                ({ id, description, tag, currency, method, value, exchangeRates }) => (
                  <tr key={ description }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ value }</td>
                    <td>{ exchangeRates[currency].name }</td>
                    <td>
                      {
                        (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)
                      }
                    </td>
                    <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => deleteExpenses(id) }
                      >
                        del
                      </button>
                      <button
                        data-testid="edit-btn"
                        type="button"
                        onClick={ (event) => this.initEditing(event, id) }
                      >
                        edit
                      </button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TableDespesa.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape(),
  })).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
  setExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (id) => dispatch(deleteExpensesAction(id)),
  editExpenses: () => dispatch(editExpense(true)),
  setExpense: (expense) => dispatch(expensesCurrencyAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableDespesa);
