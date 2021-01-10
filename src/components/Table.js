import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';
import '../style/Table.css';

class Table extends React.Component {
  render() {
    const labels = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    const { expenses, deleteExp } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              {labels.map((label) => <th key={ label }>{ label }</th>)}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const exchangeRate = parseFloat(
                expense.exchangeRates[expense.currency].ask,
              );
              const currency = expense.exchangeRates[expense.currency].name;
              const valueInBRL = exchangeRate * expense.value;
              return (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ exchangeRate.toFixed(2) }</td>
                  <td>{ currency }</td>
                  <td>{ valueInBRL.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteExp(expense.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  deleteExp: (e) => dispatch(deleteExpense(e)),
});
Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  deleteExp: propTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
