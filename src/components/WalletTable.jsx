import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletTable extends React.Component {
  filterName(currentExpense) {
    const { expensesState } = this.props;
    const currentCurrency = expensesState[0].exchangeRates[currentExpense.currency];
    return currentCurrency.name;
  }

  filterExchange(currentExpense) {
    const { expensesState } = this.props;
    const currentCurrency = expensesState[0].exchangeRates[currentExpense.currency];
    return parseFloat(currentCurrency.ask);
  }

  convertedValue(currentExpense) {
    const { expensesState } = this.props;
    const currentCurrency = expensesState[0].exchangeRates[currentExpense.currency];
    const newValue = currentCurrency.ask * currentExpense.value;
    return parseFloat(newValue);
  }

  render() {
    const { expensesState } = this.props;
    return (
      <div>
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
          {expensesState.map((expense) => (
            <tr key={ expense }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{`${parseFloat(expense.value)}`}</td>
              <td>{this.filterName(expense)}</td>
              <td>{`${this.filterExchange(expense).toFixed(2)}`}</td>
              <td>{this.convertedValue(expense).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

WalletTable.propTypes = {
  expensesState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};

export default connect(mapStateToProps, null)(WalletTable);
