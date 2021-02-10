import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.createRows = this.createRows.bind(this);
  }

  createRows() {
    const { content, remove } = this.props;
    return content.map((expense) => {
      const currency = expense.exchangeRates[expense.currency];
      return (
        <tr key={ expense.id }>
          <td role="cell">{expense.description}</td>
          <td role="cell">{expense.tag}</td>
          <td role="cell">{expense.method}</td>
          <td role="cell">{expense.value}</td>
          <td role="cell">{expense.currency}</td>
          <td role="cell">{currency.ask}</td>
          <td role="cell">{(expense.value * currency.ask).toFixed(2)}</td>
          <td role="cell">{currency.name}</td>
          <td role="cell">
            <button
              onClick={ () => remove(expense.id) }
              data-testid="delete-btn"
              type="button"
            >
              Deletar
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { content, remove, edit } = this.props;
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
            {content.map((expense) => {
              const {
                description,
                tag,
                value,
                currency,
                exchangeRates,
                method,
                id,
              } = expense;
              const { name, ask } = exchangeRates[currency];
              return (
                <tr key={ id }>
                  <td role="cell">{description}</td>
                  <td role="cell">{tag}</td>
                  <td role="cell">{method}</td>
                  <td role="cell">{value}</td>
                  <td role="cell">{name}</td>
                  <td role="cell">{parseFloat(ask).toFixed(2)}</td>
                  <td role="cell">
                    {parseFloat(value * ask).toFixed(2)}
                  </td>
                  <td role="cell">Real</td>
                  <td role="cell">
                    <button
                      onClick={ () => remove(id) }
                      data-testid="delete-btn"
                      type="button"
                    >
                      Deletar
                    </button>
                    <button
                      onClick={ () => edit(expense) }
                      data-testid="edit-btn"
                      type="button"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  content: propTypes.func.isRequired,
  remove: propTypes.func.isRequired,
  edit: propTypes.func.isRequired,
};
