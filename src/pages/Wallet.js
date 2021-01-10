import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import * as actions from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this. state = {
      moedas: [],
      isLoading: false,
    }
  }
  componentDidMount() {
    const { dispatch, loadCurrencies } = this.props;
    // this.setState({
    //   isLoading: true,
    // }, async () => {
    //   const data = loadCurrencies();
    //   this.setState({
    //     moedas: [data]
    //   })
    // })
    loadCurrencies();
  }
  render() {
    const { email, loadCurrencies, currencies } = this.props;
    // const { moedas } = this.state;
    console.log(currencies);
    return (
      <div>
        <header>
          <section>
            Bem vindo<p data-testid="email-field">{email}</p>
          </section>
          <section>
            Gastos totais R${" "}
            <p Adicione o atributo data-testid="total-field">
              0
            </p>
          </section>
          <section>
            Seus gastos estão sendo convertidos para{" "}
            <p data-testid="header-currency-field">BRL</p>
          </section>
        </header>
        <ExpenseForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(actions.fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
