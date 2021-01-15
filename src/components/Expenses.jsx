import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Expenses extends React.Component {
  constructor() {
    super();
    this.getCambio = this.getCambio.bind(this);
  }

  // Lógica do estudante Arthur Massainica
  // https://github.com/tryber/sd-07-project-trybewallet/pull/35/files
  getCambio(element, flag = null) {
    if (flag === 1) {
      const objeto = Object.values(element.exchangeRates).find(
        (element2) => element2.code === element.currency,
      );

      return objeto.name;
    }
    if (flag === 2) {
      const objeto = Object.values(element.exchangeRates).find(
        (element2) => element2.code === element.currency,
      );

      return parseFloat(objeto.ask).toFixed(2);
    }
    const objeto = Object.values(element.exchangeRates).find(
      (element2) => element2.code === element.currency,
    );

    return (objeto.ask * element.value).toFixed(2);
  }

  render() {
    const { wallet } = this.props;
    return (
      <div>
        <h2>Tabela de Gastos</h2>
        <table>
          <tbody>
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
            {wallet.expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{this.getCambio(expense, 1)}</td>
                <td>{this.getCambio(expense, 2)}</td>
                <td>{this.getCambio(expense)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

Expenses.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes,
  }).isRequired,
};

export default connect(mapStateToProps)(Expenses);
