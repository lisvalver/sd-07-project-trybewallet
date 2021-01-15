import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeObjectExpense } from '../actions';

class Table extends Component {
  // referência André Horman
  convertValues(value, currency) {
    const valueBR = Math.round(value * currency * 100) / 100;
    return valueBR;
  }

  render() {
    const { expense, removeExpense } = this.props;
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
                        onClick={ () => removeExpense(id) }
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

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeObjectExpense(id)),
});

Table.propTypes = {
  expense: PropTypes.arrayOf(Object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
