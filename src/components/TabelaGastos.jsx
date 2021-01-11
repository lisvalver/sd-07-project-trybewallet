import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TabelaGastos extends React.Component {
  constructor() {
    super();

    this.getCambio = this.getCambio.bind(this);
  }

  getCambio(element, flag = null) {
    // const { currency } = element;

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

      return parseFloat((objeto.ask)).toFixed(2);
    }
    const objeto = Object.values(element.exchangeRates).find(
      (element2) => element2.code === element.currency,
    );

    return (objeto.ask * element.value).toFixed(2);
  }

  render() {
    const { wallet } = this.props;

    return (
      <table>
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

        {wallet.expenses.map((element) => (
          <tr key={ element.id }>
            <td>{element.description}</td>
            <td>{element.tag}</td>
            <td>{element.method}</td>
            <td>{element.value}</td>
            <td>{this.getCambio(element, 1)}</td>
            <td>{this.getCambio(element, 2)}</td>
            <td>{this.getCambio(element)}</td>
            <td>Real</td>
          </tr>
        ))}
      </table>
    );
  }
}

TabelaGastos.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
    currencies: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        codein: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, null)(TabelaGastos);
