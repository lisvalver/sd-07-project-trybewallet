import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expensesAction } = this.props;
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
          {expensesAction.map((item) => (
            <tr key={ item.code }>
              <td key={ item.code }>{ item.description }</td>
              <td key={ item.code }>{ item.tag }</td>
              <td>{ item.method }</td>
              <td>{ item.value }</td>
              <td>{ item.exchangeRates[item.currency].name }</td>
              <td>{ parseFloat(item.exchangeRates[item.currency].ask).toFixed(2) }</td>
              <td>
                {
                  parseFloat(item.value * item.exchangeRates[item.currency].ask)
                    .toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button type="button" data-testid="delete-btn">Deletar Despesa</button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expensesAction: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expensesAction: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
