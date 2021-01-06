import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AddForm from "./AddForm"
import TabelaGastos from "./TabelaGastos"
import { getData } from "../actions";

const Wallet = (props) => {

  const [formDespesa, setFormDespesa] = useState("");
  const [formMoeda, setFormMoeda] = useState("USD");
  const [formDesc, setFormDesc] = useState("");
  const [formPagamento, setFormPagamento] = useState("Cartão de crédito");
  const [formTag, setFormTag] = useState("Lazer");
  const [total, setTotal] = useState(0);

  const atualizarTotal = () => {

    setTotal(
      props.expenses.reduce((acc, despesa) => {
        let valorDespesa = despesa.value;
        let moedaDespesa = despesa.currency;
        let valorMoedaDespesa = Object.entries(despesa.exchangeRates).find(e => e[1].code === moedaDespesa)[1].ask
        return acc += valorMoedaDespesa * valorDespesa
      }, 0)
    )
  }

  useEffect(() => {
    props.getData();
  }, []);

  useEffect(() => {
    atualizarTotal()
  }, [props.expenses, props.editById]);

  const adicionar = async () => {
    await props.getData();
    props.addExpense({ value: formDespesa, currency: formMoeda, description: formDesc, method: formPagamento, tag: formTag, id: props.expenses.length, exchangeRates: props.data[0] });
  }

  return (
    <div>
      <header>
        <h1 data-testid="email-field" data-testid="email-field">
          Email: {props.email}
        </h1>
        <p data-testid="total-field">total: R${total.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
        <AddForm />
      </header>
      <TabelaGastos />
    </div>
  );
};

const mapStateToProps = (store) => ({
  email: store.user.email,
  data: store.wallet.currencies,
  editById: store.wallet.editById,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
