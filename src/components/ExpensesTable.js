import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {} from '../actions';
import ExpenseRow from './ExpenseRow';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table style={ { width: '100%' } }>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido </th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseRow
              key={ expense.id }
              value={ expense.value }
              currency={ expense.currency }
              method={ expense.method }
              tag={ expense.tag }
              description={ expense.description }
              exchangeRates={ expense.exchangeRates }
            />))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({
// });

ExpensesTable.propTypes = ({
  expenses: PropTypes.shape({ map: PropTypes.func.isRequired }).isRequired,
});

export default connect(mapStateToProps)(ExpensesTable);
// export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
