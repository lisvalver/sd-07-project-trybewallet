import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TabelaDeGastos extends Component {
  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    return (
      <div>
        <h1>Tabela de Gastos </h1>
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
            {expenses.map((expense) => {
              const {
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              } = expense;
              const currencyName = exchangeRates[currency].name;
              const exchangeValue = parseFloat(exchangeRates[currency].ask).toFixed(2);
              const convertedValue = parseFloat(value * exchangeRates[currency].ask)
                .toFixed(2);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{currencyName}</td>
                  <td>{exchangeValue}</td>
                  <td>{convertedValue}</td>
                  <td>Real</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

TabelaDeGastos.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(TabelaDeGastos);
