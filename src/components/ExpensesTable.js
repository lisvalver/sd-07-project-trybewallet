import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{item.value}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                <td>
                  {(parseFloat(item.exchangeRates[item.currency].ask
                  * parseFloat(item.value)).toFixed(2))}
                </td>
                <td>Real</td>
                <button
                  type="button"
                  value={ item.id }
                  data-testid="edit-btn"
                  onClick={ console.log('ainda não funciono. :( ') }
                >
                  Editar
                </button>
                <button
                  type="button"
                  value={ item.id }
                  data-testid="delete-btn"
                  onClick={ console.log('ainda não funciono. :( ') }
                >
                  Excluir
                </button>
              </tbody>
            ))}
          </tr>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
