import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DELEXPENSE } from '../actions';

class WalletPanel extends Component {
  renderWalletHead() {
    const expenseHeader = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      <thead>
        <tr>
          {expenseHeader.map((item) => (
            <th key={ item }>{item}</th>
          ))}
        </tr>
      </thead>
    );
  }

  renderWalletBody() {
    const { excludes, expenses } = this.props;
    return (
      <tbody>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>{expense.currency}</td>
            <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
              * expense.value}
            </td>
            <td>Real</td>
            <td>
              <button
                className="btn-edit"
                type="button"
                onClick={ () => console.log('xaxablau') }
                disabled
              >
                eDitar
              </button>
              <button
                className="btn-exclude"
                type="button"
                data-testid="delete-btn"
                onClick={ () => excludes(expense.id) }
              >
                eXcluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <section>
        <table>
          {this.renderWalletHead()}
          {this.renderWalletBody()}
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  excludes: (expense) => dispatch(DELEXPENSE(expense)),
});

WalletPanel.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.number).isRequired,
  excludes: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletPanel);
