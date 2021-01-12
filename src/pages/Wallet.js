import React from 'react';
import { connect } from 'react-redux';
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
    const { expenses } = this.props
    return expenses.reduce((acc, cur) => {
      return Math.round((cur.value * cur.exchangeRates[cur.currency].ask + acc) * 100) / 100;
    }, 0)
  }

  render() {
    const { email, expenses, countExpense, deleteExpense, updateCount } = this.props;
    // console.log(countExpense);
    // console.log(expenses);
    return (
      <div>
        <Header email={email} total={countExpense} />
        <FormWallet updateCount={ () => updateCount(this.sumExpenses()) } />
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
              {expenses.map(expense => {
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
                  <tr key={id}>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{value}</td>
                    <td>{name}</td>
                    <td>{ask}</td>
                    <td>{ this.convertValues(value, ask) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid='delete-btn'
                        onClick={() => deleteExpense(id)}>
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

const mapStateToProps = state => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  countExpense: state.wallet.countExpense,
});

const mapDispatchToProps = dispatch => ({
  deleteExpense: id => dispatch(deleteExpense(id)),
  updateCount: value => dispatch(updateGlobalCount(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
