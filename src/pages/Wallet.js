import React from 'react';
import { connect } from 'react-redux';
import FormWallet from '../components/FormWallet';
import Header from '../components/HeaderWallet';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <Header email={email} />
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
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => {
                return (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{expense.value}</td>
                    <td>{expense.exchangeRates[expense.currency].name}</td>
                    <td>{expense.exchangeRates[expense.currency].ask}</td>
                    <td>
                      {Math.round(
                        (expense.value /
                          expense.exchangeRates[expense.currency].ask) *
                          100,
                      ) / 100}
                    </td>
                    <td>Real</td>
                    <button data-testid="delete-btn" >Deletar</button>
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
});

export default connect(mapStateToProps)(Wallet);
