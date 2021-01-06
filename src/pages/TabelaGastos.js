import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { delExpense, setEditById } from "../actions";

const TabelaGastos = (props) => {

  return (
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
        {props.expenses.map(d => {

          const moeda = d.currency
          return (<tr key={d.id}>
            <td>{d.description}</td>
            <td>{d.tag}</td>
            <td>{d.method}</td>
            <td>{d.value}</td>
            <td>{d.exchangeRates[moeda].name}</td>
            <td>{Number(d.exchangeRates[moeda].ask).toFixed(2)}</td>
            <td>{Number(d.exchangeRates[moeda].ask * d.value).toFixed(2)}</td>
            <td>Real</td>
            <td>
              <button type="button" onClick={() => props.setEditById(d.id)} data-testid="edit-btn">editar</button>
              <button type="button" onClick={() => props.delExpense(d.id)} data-testid="delete-btn">delete</button>
            </td>
          </tr>)
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setEditById: (id) => dispatch(setEditById(id)),
  delExpense: (id) => dispatch(delExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabelaGastos);
