import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, deleteExpenseAct, editingExpenseAct } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpense, editExpense, editingExpense } = this.props;

    return (
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
            { expenses.map(
              ({
                id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              }) => (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                  <td>
                    {(
                      Number(value)
                    * (Number(exchangeRates[currency].ask)))
                      .toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => editExpense(id, true) }
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => deleteExpense(id) }
                      disabled={ editingExpense }
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  findCurrencies: () => dispatch(fetchCurrencies()),
  deleteExpense: (id) => dispatch(deleteExpenseAct(id)),
  editExpense: (id) => dispatch(editingExpenseAct(id, true)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editingExpense: state.wallet.editingExpense,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
