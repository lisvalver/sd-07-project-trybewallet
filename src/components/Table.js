import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
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
            { expenses.map((exp) => {
              const {
                description, tag, method, value, currency, exchangeRates, id,
              } = exp;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>
                    { Math.round(parseFloat((exchangeRates[currency].ask)) * 100) / 100 }
                  </td>
                  <td>
                    { Math.round(parseFloat(value * exchangeRates[currency].ask) * 100)
                    / 100 }
                  </td>
                  <td>Real</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
