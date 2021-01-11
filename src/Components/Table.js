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
                <td>
                  {' '}
                  {item.description}
                  {' '}
                </td>
                <td>
                  {' '}
                  {item.tag}
                  {' '}
                </td>
                <td>
                  {' '}
                  {item.method}
                  {' '}
                </td>
                <td>
                  {' '}
                  {item.value}
                  {' '}
                </td>
                <td >
                  {' '}
                  {item.exchangeRates[item.currency].name}
                  {' '}
                </td>
                <td>
                  {' '}
                  {(parseFloat(item.exchangeRates[item.currency].ask)).toFixed(2)}
                  {' '}
                </td>
                <td>
                  {' '}
                  {(parseFloat(item.exchangeRates[item.currency].ask)
                  * item.value).toFixed(2)}
                  {' '}
                </td>
                <td>
                  {' '}
                  Real Brasileiro
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
