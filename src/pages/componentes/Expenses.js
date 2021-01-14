import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Expenses extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
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
        { expenses.map((element, index) => {
          const { value, currency, method, tag, description, exchangeRates } = element;
          const currencyName = exchangeRates[currency].name;
          const currencyAsk = exchangeRates[currency].ask;
          const askFixed = (parseFloat(Math.round(currencyAsk * 100)).toFixed(2)) / 100;
          const realValue = (value * currencyAsk);
          const realValueFixed = (parseFloat(
            Math.round(realValue * 100)).toFixed(2)) / 100;
          return (
            <tr key={ index } className="table-row">
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>
                { currency }
                { value }
              </td>
              <td>{ currencyName }</td>
              <td>{ askFixed }</td>
              <td>{ realValueFixed }</td>
              <td>Real Brasileiro</td>
              <td>
                <button
                type='button'
                >
                  Editar
                </button>
                <button
                type='button'
                >
                  Excluir
                </button>
              </td>
            </tr>);
        })}
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Expenses);

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf()),
}.isRequired;
