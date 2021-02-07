import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAPI,
  addExpense,
  totalExpenses,
  updateExpenses,
  saveOrEdit } from '../actions';
import Table from './Table';

function Form() {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.wallet.currencies);
  const isEditable = useSelector((state) => state.wallet.saveOrEdit);
  const editId = useSelector((state) => state.wallet.editId);
  const arrayExpense = useSelector((state) => state.wallet.expenses);

  const defaultExpense = {
    id: 0,
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: [],
  };
  const [expense, setExpense] = useState(defaultExpense);

  const currenciesKeys = Object.keys(currencies).filter(
    (currency) => currency !== 'USDT',
  );

  useEffect(() => {
    if (isEditable) {
      return setExpense(arrayExpense.find(({ id }) => id === editId));
    }
  }, [isEditable]);

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  const handleChange = ({ target: { id, value } }) => setExpense(
    { ...expense, [id]: value, exchangeRates: currencies },
  );

  const handleEdit = () => {
    dispatch(updateExpenses(expense));
    dispatch(totalExpenses());
    dispatch(saveOrEdit());
    setExpense({
      ...defaultExpense,
      id: arrayExpense.length,
    });
  };

  const handleClick = () => {
    dispatch(addExpense(expense));
    dispatch(fetchAPI());
    dispatch(totalExpenses());
    setExpense({
      ...defaultExpense,
      id: expense.id + 1,
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="value">
          Value:
          <input
            type="number"
            data-testid="value-input"
            id="value"
            value={ expense.value }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="description">
          Description:
          <input
            data-testid="description-input"
            id="description"
            value={ expense.description }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            id="currency"
            value={ expense.currency }
            onChange={ handleChange }
          >
            {currenciesKeys.map((currency, index) => (
              <option data-testid={ currency } key={ index } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          <select
            data-testid="method-input"
            id="method"
            value={ expense.method }
            onChange={ handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            id="tag"
            value={ expense.tag }
            onChange={ handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        {isEditable ? (
          <button type="button" onClick={ handleEdit }>
            Editar despesa
          </button>
        ) : (
          <button type="button" onClick={ handleClick }>
            Adicionar despesa
          </button>
        )}
      </form>
      <body>
        <Table />
      </body>
    </div>
  );
}

export default Form;
