import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../../components/WalletHeader';

class Wallet extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <>
        <WalletHeader />
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
            {expenses.map((exp) => (
              <tr key={ exp.id }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{parseFloat(exp.value)}</td>
                <td>{exp.exchangeRates[exp.currency].name}</td>
                <td>{parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (parseFloat(exp.value)
                    * parseFloat(exp.exchangeRates[exp.currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStatetoProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStatetoProps)(Wallet);
