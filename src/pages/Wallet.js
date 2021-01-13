import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormWallet from '../components/FormWallet';
import Header from '../components/HeaderWallet';
import { deleteExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.convertValues = this.convertValues.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  convertValues(value, currency) {
    const valueBR = Math.round(value * currency * 100) / 100;
    return valueBR;
  }

  sumExpenses() {
    const { getExpenses } = this.props;
    return getExpenses.reduce(
      (acc, cur) => Math.round(
        (cur.value * cur.exchangeRates[cur.currency].ask + acc) * 100,
      ) / 100,
      0,
    );
  }

  render() {
    const {
      getEmail,
      getExpenses,
      executeDeleteExpense,
    } = this.props;
    // console.log(getExpenses);
    return (
      <div>
        <Header email={ getEmail } total={ this.sumExpenses() } />
        <FormWallet />
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
              {getExpenses.map((expense) => {
                const {
                  id,
                  description,
                  tag,
                  method,
                  value,
                  currency,
                  exchangeRates,
                } = expense;
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
                        onClick={ () => executeDeleteExpense(id) }
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
  getEmail: state.user.email,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  executeDeleteExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getExpenses: PropTypes.arrayOf(Object).isRequired,
  executeDeleteExpense: PropTypes.func.isRequired,
};
