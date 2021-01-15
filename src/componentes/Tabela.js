import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Tabela extends Component {
  convertValues(value, currency) {
    const valor = Math.round(value * currency * 100) / 100;
    return valor;
  }

  // Referencia Alexandre Faustino

  render() {
    const { expense } = this.props;
    return (
      <div>
        <section>
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
              {expense.map((item) => {
                const {
                  id,
                  description,
                  tag,
                  method,
                  value,
                  currency,
                  exchangeRates,
                } = item;
                const {
                  [currency]: { name, ask },
                } = exchangeRates;
                return (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{value}</td>
                    <td>{name}</td>
                    <td>{parseFloat(ask).toFixed(2)}</td>
                    <td>{this.convertValues(value, ask)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});
Tabela.propTypes = {
  expense: PropTypes.arrayOf(Object).isRequired,
};
export default connect(mapStateToProps, null)(Tabela);
