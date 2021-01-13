import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import Table from "../components/Table";
import * as actions from '../actions/index';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <section>
            Bem vindo
            <p data-testid="email-field">{email}</p>
          </section>
          <section>
            Gastos totais R$
            <p Adicione o atributo data-testid="total-field">
              {0}
            </p>
          </section>
          <section>
            Seus gastos estão sendo convertidos para
            {' '}
            <p data-testid="header-currency-field">BRL</p>
          </section>
        </header>
        <ExpenseForm />
        <Table />
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
