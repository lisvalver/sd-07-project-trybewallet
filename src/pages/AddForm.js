import React, { useState } from "react";
import { connect } from "react-redux";
import { addExpense, editExpense, getData, delExpense, currencyIdIncrement } from "../actions";


const AddForm = (props) => {

  const [formDespesa, setFormDespesa] = useState("");
  const [formMoeda, setFormMoeda] = useState("USD");
  const [formDesc, setFormDesc] = useState("");
  const [formPagamento, setFormPagamento] = useState("Cartão de crédito");
  const [formTag, setFormTag] = useState("Lazer");

  const adicionar = async () => {
    await props.getData();
    props.addExpense({ value: formDespesa, currency: formMoeda, description: formDesc, method: formPagamento, tag: formTag, id: props.currencyId, exchangeRates: props.data[0] });
    props.currencyIdIncrement();
  }

  const editar = async () => {
    await props.getData();
    props.editExpense(props.editById, { value: formDespesa, currency: formMoeda, description: formDesc, method: formPagamento, tag: formTag, id: props.editById, exchangeRates: props.data[0] });
  }

  return (
    <div>
      <form>
        <label htmlFor="despesa">
          Valor da despesa
            <input
            type="number"
            data-testid="value-input"
            name="despesa"
            id="despesa"
            value={formDespesa}
            onChange={(e) => setFormDespesa(e.target.value)}
          />
        </label>
        <label htmlFor="moeda">
          MoOoOoeda
            <select
            name="moeda"
            id="moeda"
            value={formMoeda}
            data-testid="currency-input"
            onChange={(e) => setFormMoeda(e.target.value)}>
            {props.data.length > 0 &&
              Object.keys(props.data[0]).map((e, i) => {
                return <option key={i} data-testid={e} value={e}>{e}</option>;
              })}
          </select>
        </label>
        <label htmlFor="desc">
          descrição
            <input
            type="text"
            data-testid="description-input"
            name="desc"
            id="desc"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
          />
        </label>
        <label htmlFor="pagamento">
          {" "}
            Forma de Pagamento
            <select
            name="pagamento"
            id="pagamento"
            data-testid="method-input"
            value={formPagamento}
            onChange={(e) => setFormPagamento(e.target.value)}>

            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="pagamento">
          {" "}
            tag
            <select
            name="pagamento"
            id="pagamento"
            data-testid="tag-input"
            value={formTag}
            onChange={(e) => setFormTag(e.target.value)}>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
            <option value="Alimentação">Alimentação</option>
          </select>
        </label>
        {props.editById == -1
          ? <button type="button" onClick={adicionar}>Adicionar despesa</button>
          : <button type="button" onClick={editar}>Editar despesa</button>}
      </form>
    </div>
  );
};

const mapStateToProps = (store) => ({
  email: store.user.email,
  data: store.wallet.currencies,
  expenses: store.wallet.expenses,
  editById: store.wallet.editById,
  currencyId: store.wallet.currencyId,

});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  addExpense: (obj) => dispatch(addExpense(obj)),
  delExpense: (id) => dispatch(delExpense(id)),
  editExpense: (id, newExpense) => dispatch(editExpense(id, newExpense)),
  currencyIdIncrement: () => dispatch(currencyIdIncrement()),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
