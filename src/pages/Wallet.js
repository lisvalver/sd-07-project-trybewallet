import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormWallet from '../components/FormWallet';
import Header from '../components/HeaderWallet';
import { deleteExpense, updateGlobalCount } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.convertValues = this.convertValues.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidUpdate() {
    console.log(this.sumExpenses());
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
      getCountExpense,
      executeDeleteExpense,
      executeUpdateCount,
    } = this.props;
    // console.log(getCountExpense);
    // console.log(getExpenses);
    return (
      <div>
        <Header email={ getEmail } total={ getCountExpense } />
        <FormWallet
          updateCount={ () => executeUpdateCount(this.sumExpenses()) }
        />
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
                    <td>{ask}</td>
                    <td>{this.convertValues(value, ask)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => executeDeleteExpense(id) }
                      >
                        Deletar
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
  getCountExpense: state.wallet.countExpense,
});

const mapDispatchToProps = (dispatch) => ({
  executeDeleteExpense: (id) => dispatch(deleteExpense(id)),
  executeUpdateCount: (value) => dispatch(updateGlobalCount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getExpenses: PropTypes.arrayOf(Object).isRequired,
  getCountExpense: PropTypes.number.isRequired,
  executeDeleteExpense: PropTypes.func.isRequired,
  executeUpdateCount: PropTypes.func.isRequired,
};
