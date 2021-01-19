import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    let totalPriceExpenses = 0;
    return (
      <div>
        <tr>
          <td>Descrição</td>
          <td>Tag</td>
          <td>Método de pagamento</td>
          <td>Valor</td>
          <td>Moeda</td>
          <td>Câmbio utilizado</td>
          <td>Valor convertido</td>
          <td>Moeda de conversão</td>
          <td>Editar/Excluir</td>
        </tr>
        {expenses.map((expense) => {
          const {
            description,
            tag,
            method,
            currency,
            value,
            exchangeRates,
          } = expense;
          totalPriceExpenses = value * exchangeRates[currency].ask;
          return (
            <tr key={ description }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>
                {Number(exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>{totalPriceExpenses.toFixed(2)}</td>
              <td>Real</td>
            </tr>
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
