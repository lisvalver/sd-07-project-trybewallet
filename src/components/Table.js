import React, { Component } from 'react'

export default class Table extends Component {
  createRows = () => {
    return this.props.value.map(expense => {
    const currency = expense.exchangeRates[expense.currency]
      return (
      <tr key={expense.id}>
          <td role="cell">{expense.description}</td>
          <td role="cell">{expense.tag}</td>
          <td role="cell">{expense.method}</td>
          <td role="cell">{expense.value}</td>
          <td role="cell">{expense.currency}</td>
          <td role="cell">{currency.ask}</td>
          <td role="cell">{(expense.value * currency.ask).toFixed(2)}</td>
          <td role="cell">{currency.name}</td>
          <td role="cell"><button
          onClick={() => this.props.remove(expense.id)}
          data-testid="delete-btn">
            Deletar
          </button></td>
      </tr>
    );
  });
  }
  render() {
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
        {this.props.value.map(expense => {
    const currency = expense.exchangeRates[expense.currency]
      return (
      <tr key={expense.id}>
          <td role="cell">{expense.description}</td>
          <td role="cell">{expense.tag}</td>
          <td role="cell">{expense.method}</td>
          <td role="cell">{expense.value}</td>
          <td role="cell">{currency.name}</td>
          <td role="cell">{parseFloat(currency.ask).toFixed(2)}</td>
          <td role="cell">{parseFloat(expense.value * currency.ask).toFixed(2)}</td>
          <td role="cell">Real</td>
          <td role="cell"><button
          onClick={() => this.props.remove(expense.id)}
          data-testid="delete-btn">
            Deletar
          </button></td>
      </tr>
    );
  })}
        </tbody>
        </table>
      </div>
    )
  }
}
