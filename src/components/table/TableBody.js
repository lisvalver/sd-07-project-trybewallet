import React from 'react';
import propTypes from 'prop-types';

class TableBody extends React.Component {
  render() {
    const { expenses, expenseDelete } = this.props;
    return (
      <tbody>
        {expenses.map((expense) => {
          const exchangeRate = parseFloat(
            expense.exchangeRates[expense.currency].ask,
          );
          const currency = expense.exchangeRates[expense.currency].name;
          const valueBRL = exchangeRate * expense.value;
          return (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{exchangeRate.toFixed(2)}</td>
              <td>{currency}</td>
              <td>{valueBRL.toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => expenseDelete(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;

TableBody.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  expenseDelete: propTypes.func.isRequired,
};
