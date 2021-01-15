import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletTable extends React.Component {
  sumExpenses(expenses) {
    const reduceAndSum = expenses.reduce((acc, expense) => {
      const value = parseFloat(expense.value);
      const multiplier = parseFloat(expense.exchangeRates[expense.currency].ask);
      return acc + value * multiplier;
    }, 0);
    return reduceAndSum;
  }

  render() {
    const { expenses } = this.props;
    return (
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
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const {
                currency,
                description,
                exchangeRates,
                method,
                tag,
                value,
              } = expense;
              const { ask } = exchangeRates[currency];
              return (
                <tr key="">
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ parseFloat(ask).toFixed(2) }</td>
                  <td>{ (value * ask).toFixed(2) }</td>
                  <td>Real</td>
                </tr>
              );
            })
          }
          <td>Editar/Excluir</td>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(WalletTable);
