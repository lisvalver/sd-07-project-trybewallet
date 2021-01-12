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
        </tr>
        { expenses.map((element, index) => {
          const { cash, currency, methodInput, tagInput, infor, exchangeRates } = element;
          const currencyName = exchangeRates[currency].name;
          const currencyAsk = exchangeRates[currency].ask;
          const askFixed = (parseFloat(Math.round(currencyAsk * 100)).toFixed(2)) / 100;
          const realValue = (cash * currencyAsk);
          const realValueFixed = (parseFloat(Math.round(realValue * 100)).toFixed(2)) / 100;
          return (
            <tr className="table-row">
              <td key={ index } className="col col-1">{ infor }</td>
              <td key={ index } className="col col-2">{ tagInput }</td>
              <td key={ index } className="col col-3">{ methodInput }</td>
              <td key={ index } className="col col-4">{ currency } { cash }</td>
              <td key={ index } className="col col-5">{ currencyName }</td>
              <td key={ index } className="col col-6">{ askFixed }</td>
              <td key={ index } className="col col-7">{ realValueFixed }</td>
              <td key={ index } className="col col-8">Real Brasileiro</td>
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
