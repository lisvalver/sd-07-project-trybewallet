import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {expenses} = this.props;
    return (
      <div>
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
          {expenses.map((item) => (
            <tr>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>{parseFloat(item.value)* parseFloat(item.exchangeRates[item.currency].ask)}</td>
              <td>Real</td>
              <td>
                <button data-testid="delete-btn">Deletar</button>
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
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
