import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  showExpenses() {
    const { expenses } = this.props;
    return expenses.forEach((element) => {
      const { method, currency, tag, description, value, exchangeRates } = element;
      return (
        <tr>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ (exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ value * exchangeRates[currency].ask }</td>
          <td>Real</td>
        </tr>
      );
    });
  }

  render() {
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
        { this.showExpenses() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Table);
