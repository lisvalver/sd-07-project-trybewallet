import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpensesAction } from '../actions';

class Table extends React.Component {
  render() {
    const { expense, delExpenses } = this.props;
    return (
      <section>
        <table>
          <tbody>
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
            {expense.map(
              ({ id, value, description, currency, method, tag, exchangeRates }) => (
                <tr key={ id }>
                  <td>
                    { description }
                  </td>
                  <td>
                    { tag }
                  </td>
                  <td>
                    { method }
                  </td>
                  <td>
                    { value }
                  </td>
                  <td>
                    { exchangeRates[currency].name }
                  </td>
                  <td>
                    { parseFloat(exchangeRates[currency].ask).toFixed(2) }
                  </td>
                  <td>
                    { parseFloat(value * exchangeRates[currency].ask).toFixed(2) }
                  </td>
                  <td>
                    Real
                  </td>
                  <td>
                    <button
                      type="button"
                    >
                      Editar
                    </button>
                    {' '}
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => delExpenses(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpenses: (id) => dispatch(delExpensesAction(id)),
});

Table.propTypes = {
  expense: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  delExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
