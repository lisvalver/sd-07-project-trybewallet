import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const name = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
    ];
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              {name.map((tipos) => (
                <th key={ tipos }>
                  {' '}
                  {tipos}
                  {' '}
                </th>
              ))}
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {
            expenses.map((item) => (
              <tr key={ item.id }>
                <td className="Descricao">
                  {' '}
                  {item.description}
                  {' '}
                </td>
                <td className="Tag">
                  {' '}
                  {item.tag}
                  {' '}
                </td>
                <td className="Metodo_pagamento">
                  {' '}
                  {item.method}
                  {' '}
                </td>
                <td className="Valor">
                  {' '}
                  {item.value}
                  {' '}
                </td>
                <td naclassNameme="Moeda">
                  {' '}
                  {item.exchangeRates[item.currency].name}
                  {' '}
                </td>
                <td className="Cambio_utilizado">
                  {' '}
                  {(parseFloat(item.exchangeRates[item.currency].ask)).toFixed(2)}
                  {' '}
                </td>
                <td className="Valor_convertido">
                  {' '}
                  {(parseFloat(item.exchangeRates[item.currency].ask)
                  * item.value).toFixed(2)}
                  {' '}
                </td>
                <td className="Moeda_conversao">
                  {' '}
                  BRL
                  {' '}
                </td>
                <td>
                  <button data-testid="edit-btn" type="button">
                    Editar despesa
                  </button>
                  <button data-testid="delete-btn" type="button">
                    Excluir despesa
                  </button>
                </td>
              </tr>))
          }

        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);
