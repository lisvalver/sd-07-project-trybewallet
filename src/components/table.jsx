import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const {
              id,
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates } = expense;

            const { [currency]: { name, ask } } = exchangeRates;
            const calcExchange = parseFloat(value) * parseFloat(ask);

            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ name }</td>
                <td>{ parseFloat(ask).toFixed(2) }</td>
                <td>{ parseFloat(calcExchange).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    data-testid="delete-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="btn btn-danger btn-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
