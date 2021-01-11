import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expense } = this.props;
    return (
      <section>
        <table>
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
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ),
          )}
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

Table.propTypes = {
  expense: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default connect(mapStateToProps)(Table);
