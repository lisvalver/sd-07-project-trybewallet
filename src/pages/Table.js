import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteRow } from '../actions';

class Table extends Component {
  render() {
    const { expenses, buttonDelete } = this.props;
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
            <tr key={ item.id }>
              <td>{ item.description }</td>
              <td>{ item.tag }</td>
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
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => buttonDelete(item.id) }
                >
                  Deletar
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
  buttonDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  buttonDelete: (id) => dispatch(deleteRow(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
