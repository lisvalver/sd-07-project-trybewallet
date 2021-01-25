import React from 'react';
import PropTypes from 'prop-types';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.getExpenses = this.getExpenses.bind(this);
  }

  getExpenses(expense) {
    const {
      description,
      value,
      currency,
      method,
      tag,
      exchangeRates,
      id,
    } = expense;
    const nameCurrency = Object.values(exchangeRates).find(
      (item) => item.code === currency,
    );
    const { name, ask } = nameCurrency;
    return (
      <div key={ id } className="content">
        <div role="cell">{description}</div>
        <div role="cell">{tag}</div>
        <div role="cell">{method}</div>
        <div role="cell">{value}</div>
        <div role="cell">{name}</div>
        <div role="cell">{parseFloat(ask).toFixed(2)}</div>
        <div role="cell">{(value * ask).toFixed(2)}</div>
        <div role="cell">Real</div>
      </div>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <div className="header-table">
          <div>Descrição</div>
          <div>Tag</div>
          <div>Método de pagamento</div>
          <div>Valor</div>
          <div>Moeda</div>
          <div>Câmbio utilizado</div>
          <div>Valor convertido</div>
          <div>Moeda de conversão</div>
          <div>Editar/Excluir</div>
        </div>
        <div className="content-table">
          {expenses.length === 0 ? (
            <p className="message">Você ainda não adicionou as suas despesas :(</p>
          ) : (
            expenses.map((expense) => this.getExpenses(expense))
          )}
        </div>
      </div>
    );
  }
}

export default ExpensesTable;

ExpensesTable.propTypes = {  
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
