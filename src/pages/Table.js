import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={ item.code }>
              <th key={ item.code }>{ item.description }</th>
              <th key={ item.code }>{ item.tag }</th>
              <th>{ item.method }</th>
              <th>{ item.value }</th>
              <th>{ item.exchangeRates[item.currency].name }</th>
              <th>{ parseFloat(item.exchangeRates[item.currency].ask).toFixed(2) }</th>
              <th>
                {
                  parseFloat(item.value * item.exchangeRates[item.currency].ask)
                    .toFixed(2)
                }
              </th>
              <th>Real</th>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
