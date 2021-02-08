import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrencies, addExpenses, newExpenseArray } from '../actions';
import getCurrencies from '../services/api';

const Wallet = () => {
  const [currenciesTitles, setCurrenciesTitles] = useState([]);
  const [total, setTotal] = useState(0);
  const { expenses } = useSelector((state) => state.wallet);
  const [newExpense, setNewExpense] = useState({
    id: '',
    value: 0,
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
    exchangeRates: {},
  });

  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrencies()
      .then((response) => {
        delete response.USDT;
        dispatch(addCurrencies(response));
        setCurrenciesTitles(Object.keys(response));
      });
  }, []);

  function calculateTotal() {
    const allValues = expenses.length
      ? expenses.map((obj) => parseFloat(obj.value * obj.exchangeRates[obj.currency].ask))
      : 0;
    const newTotal = allValues.length
      ? allValues.reduce((acc, currValue) => acc + currValue, 0).toFixed(2)
      : 0;
    setTotal(newTotal);
  }

  useEffect(() => {
    calculateTotal();
  });

  const addExpensesThunk = async (expenseToAdd) => {
    const data = await getCurrencies();
    const newId = expenses.length ? expenses[expenses.length - 1].id + 1 : 0;
    const expenseToSend = {
      ...expenseToAdd,
      id: newId,
      exchangeRates: data,
    };
    dispatch((addExpenses(expenseToSend)));
  };

  const handleSendExpenses = async (event) => {
    event.preventDefault();
    addExpensesThunk(newExpense);
    setNewExpense({
      id: '',
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: {},
    });
  };

  function handleChange({ target }) {
    setNewExpense({
      ...newExpense,
      [target.name]: target.value,
    });
  }

  function deleteExpense(id) {
    const newExpenseArrayToSend = expenses.filter((eachExpense) => eachExpense.id !== id);
    dispatch(newExpenseArray(newExpenseArrayToSend));
  }

  return (
    <div>
      <header>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">
          {total}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>

      <form onChange={ handleChange } id="expenses-form">
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ newExpense.value }
        />
        <input
          data-testid="description-input"
          name="description"
          value={ newExpense.description }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ newExpense.currency }
        >
          {currenciesTitles.map((currency, i) => (
            <option
              key={ i }
              data-testid={ currency }
              value={ currency }
            >
              {currency}
            </option>))}
        </select>
        <select
          data-testid="method-input"
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          onClick={ handleSendExpenses }
          type="button"
        >
          Adicionar despesa
        </button>
      </form>

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
          {expenses.map((eachExpense, key) => {
            const fullName = eachExpense.exchangeRates[eachExpense.currency].name;
            const exchangeRateUsed = parseFloat(
              eachExpense.exchangeRates[eachExpense.currency].ask,
            ).toFixed(2);
            const convertedValue = parseFloat(
              eachExpense.value * exchangeRateUsed,
            ).toFixed(2);
            return (
              <tr key={ key }>
                <td>{eachExpense.description}</td>
                <td>{eachExpense.tag}</td>
                <td>{eachExpense.method}</td>
                <td>{eachExpense.value}</td>
                <td>{fullName}</td>
                <td>{exchangeRateUsed}</td>
                <td>{convertedValue}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => deleteExpense(eachExpense.id) }
                  >
                    Deletar
                  </button>
                  <button data-testid="edit-btn" type="button">
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>

  );
};

export default Wallet;
