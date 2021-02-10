import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExpenseAction,
  totalExpenseAction,
  stateEditExpenseAction,
  addAlteredExpenseAction,
} from '../../actions/index';
import Table from '../Table/index';

// https://medium.com/reactbrasil/substituindo-o-redux-pelo-context-api-react-hooks-a70e995daa1d
// https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd

const Form = () => {
  const [countID, setCountID] = useState(0);
  const innitialState = {
    id: countID,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };
  const total = useSelector((state) => state.wallet.totalValue);
  const expenseEdit = useSelector((state) => state.wallet.expenseEdit);
  const allExpenses = useSelector((state) => state.wallet.expenses);

  const [expense, setExpense] = useState(innitialState);
  const edit = useSelector((state) => state.wallet.edit);

  const dispatch = useDispatch();
  const fetchApi = async () => {
    const result = await fetch('https://economia.awesomeapi.com.br/json/all');
    result.json().then((values) => setExpense(
      { ...expense, exchangeRates: values },
    ));
  };

  useEffect(() => {
    if (edit) {
      setExpense(expenseEdit[0]);
    }
  }, [edit]);

  useEffect(() => {
    fetchApi();
  }, [countID, total]);

  useEffect(() => {

  }, [expense.id !== countID]);
  const { exchangeRates } = expense;

  const addButton = () => {
    dispatch(addExpenseAction(expense));
    dispatch(totalExpenseAction());
    setCountID(countID + 1);
    setExpense({
      ...innitialState,
      id: countID + 1,
    });
  };

  const attExpenses = [];
  const alteredExpense = () => {
    allExpenses.map((expen) => {
      if (expen.id === expense.id) {
        expen.value = expense.value;
        expen.description = expense.description;
        expen.currency = expense.currency;
        expen.exchangeRates = expense.exchangeRates;
        expen.id = expense.id;
        expen.method = expense.method;
        expen.tag = expense.tag;
      }
      attExpenses.push(expen);
      return '';
    });
    return attExpenses;
  };

  const editButton = () => {
    dispatch(stateEditExpenseAction(false));
    alteredExpense();
    dispatch(addAlteredExpenseAction(attExpenses));
    dispatch(totalExpenseAction());
    setCountID(countID + 1);
    setExpense({
      ...innitialState,
      id: countID + 1,
    });
  };

  return (
    <div>
      <form>

        <label htmlFor="value">
          Valor:
          <input
            id="value"
            name="value"
            type="number"
            data-testid="value-input"
            value={ expense.value }
            onChange={ ({ target: { value } }) => {
              setExpense(
                { ...expense, value },
              );
            } }
          />
        </label>

        <label htmlFor="expensesDescribe">
          Descrição:
          <input
            id="expensesDescribe"
            name="expensesDescribe"
            type="text"
            data-testid="description-input"
            autoComplete="off"
            autoCorrect="off"
            value={ expense.description }
            onChange={ ({ target: { value } }) => {
              setExpense(
                { ...expense, description: value },
              );
            } }
            placeholder="Compras do mês"
          />
        </label>

        <label htmlFor="currency">
          <select
            onChange={ ({ target: { value } }) => {
              setExpense(
                { ...expense, currency: value },
              );
            } }
            value={ expense.currency }
            id="currency"
            name="currency"
            data-testid="currency-input"
          >
            {Object.keys(exchangeRates).map((element) => {
              if (element !== 'USDT') {
                return (
                  <option
                    key={ element }
                    data-testid={ element }
                    value={ element }
                  >
                    { element }
                  </option>
                );
              }
              return '';
            })}
          </select>
        </label>

        <label htmlFor="method">
          Forma de pagamento:
          <select
            type="text"
            id="method"
            name="method"
            data-testid="method-input"
            onChange={ ({ target: { value } }) => {
              setExpense(
                { ...expense, method: value },
              );
            } }
            value={ expense.method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            type="text"
            id="tag"
            name="tag"
            data-testid="tag-input"
            onChange={ async ({ target: { value } }) => {
              setExpense(
                { ...expense, tag: value },
              );
            } }
            value={ expense.tag }
            onMouseLeave={ fetchApi }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ !edit ? addButton : editButton }
        >
          {!edit ? 'Adicionar Despesas' : 'Editar Despesas'}
        </button>
      </form>
      <Table />
    </div>
  );
};

export default Form;
