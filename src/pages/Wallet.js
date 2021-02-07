import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenses } from '../actions';
import getCurrencies from '../services/api';

const Wallet = () => {
  const [currencies, setCurrencies] = useState([]);
  const { expenses } = useSelector((state) => state.wallet);
  const [newExpense, setNewExpense] = useState({
    id: '',
    value: '',
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
        setCurrencies(Object.keys(response));
      });
  }, []);

  useEffect(() => {
    // console.log(newExpense);
    const test = expenses.length ? expenses[expenses.length - 1].id + 1 : 0;
    console.log(test);
  }, [newExpense]);

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

  function handleSendExpenses() {
    addExpensesThunk(newExpense);
  }

  function handleChange({ target }) {
    setNewExpense({
      ...newExpense,
      [target.name]: target.value,
    });
  }

  return (
    <div>
      <header>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">
          0
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>

      <form onChange={ handleChange }>
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
          {currencies.map((currency, i) => (
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
    </div>

  );
};

export default Wallet;
