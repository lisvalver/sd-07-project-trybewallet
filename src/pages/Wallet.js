import React from 'react';
import { connect } from 'react-redux';
import FormWallet from '../components/FormWallet';
import Header from '../components/HeaderWallet';
import { deleteExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.updateValues = this.updateValues.bind(this);
    this.convertValues = this.convertValues.bind(this);

    this.state = {
      sumValues: 0,
    };
  }

  updateValues(value) {
    this.setState(({ sumValues }) => ({
      sumValues: sumValues + value,
    }));
  }

  convertValues(value, currency) {
    const valueBR = (value * currency * 100) / 100;
    return valueBR;
  }

  render() {
    const { sumValues } = this.state;
    const { email, expenses, deleteExpense } = this.props;
    console.log(expenses);
    return (
      <div>
        <Header email={email} total={sumValues} />
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
                    <td>{this.convertValues(value, ask)}</td>
                    <td>Real</td>
                    <td>
                      <button data-testid='delete-btn' onClick={deleteExpense}>
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
});

const mapDispatchToProps = dispatch => ({
  deleteExpense: () => dispatch(deleteExpense()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
