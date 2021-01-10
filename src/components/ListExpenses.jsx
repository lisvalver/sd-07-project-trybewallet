import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ListExpenses extends Component {
  constructor() {
    super();

    this.getAskValue = this.getAskValue.bind(this);
    this.convertedValue = this.convertedValue.bind(this);
  }

  getAskValue(expenseObject) {
    return parseFloat(expenseObject.exchangeRates[expenseObject.currency].ask);
  }

  convertedValue(expenseObject) {
    const value = parseFloat(expenseObject.value);
    return value * this.getAskValue(expenseObject);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
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
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>{ this.getAskValue(expense).toFixed(2) }</td>
                  <td>{ this.convertedValue(expense).toFixed(2) }</td>
                  <td>Real</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ListExpenses.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(ListExpenses);
