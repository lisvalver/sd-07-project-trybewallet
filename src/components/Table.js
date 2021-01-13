import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteExpenseAction,
  fetchCurrencies,
  editingExpenseAction,
} from '../actions/index';

class Table extends Component {
  render() {
    const { arrayOfExpenses, deleteExpense, editExpense, isEditing } = this.props;

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
            {arrayOfExpenses.map(
              ({
                id,
                description,
                currency,
                value,
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
                  <td>
                    {
                      (Number(value) * (Number(exchangeRates[currency].ask)))
                    }
                  </td>
                  <td>
                    {
                      (Number(exchangeRates[currency].ask).toFixed(2))
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => editExpense(id, true) }
                    >
                      O
                    </button>
                  </td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => deleteExpense(id) }
                      disabled={ isEditing }
                    >
                      X
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

const mapStateToProps = (state) => ({
  arrayOfExpenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
  getCurrencies: () => dispatch(fetchCurrencies()),
  editExpense: (id) => dispatch(editingExpenseAction(id, true)),
});

Table.propTypes = {
  arrayOfExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditing: PropTypes.bool.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
