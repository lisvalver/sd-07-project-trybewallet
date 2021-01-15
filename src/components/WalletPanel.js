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
      <tr>
        {expenseHeader.map((item) => (
          <th key={ item }>{item}</th>
        ))}
      </tr>
    );
  }

  renderWalletBody() {
    const { excludes, expenses } = this.props;
    return (
      expenses.map((expense) => {
        const {
          id,
          description,
          tag,
          method,
          value,
          currency,
          exchangeRates } = expense;
        return (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{exchangeRates[currency].name}</td>
            <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>
              {Number((exchangeRates[currency].ask) * (value)).toFixed(2)}
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
                onClick={ () => excludes(id) }
              >
                eXcluir
              </button>
            </td>
          </tr>
        );
      })
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
