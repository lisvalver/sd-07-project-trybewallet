import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
// import Table from "../components/Table";
import * as actions from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this. state = {
      total: 0,
      isLoading: false,
    }
  }

  sum() {
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, curr) => (
      parseFloat(acc) + (parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask))
    ), 0);
    this.setState({
      total: totalExpenses,
    });
  }
  // componentDidMount() {
  //   const { dispatch, loadCurrencies } = this.props;
  //   // this.setState({
  //   //   isLoading: true,
  //   // }, async () => {
  //   //   const data = loadCurrencies();
  //   //   this.setState({
  //   //     moedas: [data]
  //   //   })
  //   // })
  //   loadCurrencies();
  // }
  render() {
    const { email, currencies, expenses, total } = this.props;
    // const { moedas } = this.state;
    console.log(currencies);
    return (
      <div>
        <header>
          <section>
            Bem vindo<p data-testid="email-field">{email}</p>
          </section>
          <section>
            Gastos totais R$ 
            <p Adicione o atributo data-testid="total-field">
            {total.toFixed(2)}
            </p>
          </section>
          <section>
            Seus gastos estão sendo convertidos para{" "}
            <p data-testid="header-currency-field">BRL</p>
          </section>
        </header>
        <ExpenseForm />
        {/* <Table /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

// const mapDispatchToProps = (dispatch) => ({
//   loadCurrencies: () => dispatch(actions.fetchCurrencies()),
// });

export default connect(mapStateToProps)(Wallet);
