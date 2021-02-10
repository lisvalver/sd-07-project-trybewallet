import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApi, add, total, update, edit } from '../actions';

function Form() {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.wallet.currencies);
  const isEditable = useSelector((state) => state.wallet.edit);
  const editId = useSelector((state) => state.wallet.editId);
  const arr = useSelector((state) => state.wallet.expenses);

  const model = {
    id: 0,
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: [],
  };
  const [expense, setExpense] = useState(model);

  const moedas = Object.keys(currencies).filter(
    (currency) => currency !== 'USDT',
  );

  useEffect(() => {
    if (isEditable) {
      return setExpense(arr.find(({ id }) => id === editId));
    }
  }, [isEditable]);

  useEffect(() => {
    dispatch(fetchApi());
  }, []);

  const onChange = ({ target: { id, value } }) => setExpense(
    { ...expense, [id]: value, exchangeRates: currencies },
  );

  const save = () => {
    dispatch(update(expense));
    dispatch(total());
    dispatch(edit());
    setExpense({
      ...model,
      id: arr.length,
    });
  };

  const Click = () => {
    dispatch(add(expense));
    dispatch(fetchApi());
    dispatch(total());
    setExpense({
      ...model,
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
            onChange={ onChange }
          />
        </label>

        <label htmlFor="description">
          Description:
          <input
            data-testid="description-input"
            id="description"
            value={ expense.description }
            onChange={ onChange }
          />
        </label>

        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            id="currency"
            value={ expense.currency }
            onChange={ onChange }
          >
            {moedas.map((currency, index) => (
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
            onChange={ onChange }
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
            onChange={ onChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        {isEditable ? (
          <button type="button" onClick={ save }>
            Editar despesa
          </button>
        ) : (
          <button type="button" onClick={ Click }>
            Adicionar despesa
          </button>
        )}
      </form>
    </div>
  );
}

/* https://github.com/tryber/sd-07-project-trybewallet/pull/136
https://github.com/tryber/sd-07-project-trybewallet/pull/135/files
https://github.com/tryber/sd-07-project-trybewallet/pull/126/files
plantão do zambeli + origamid Redux Toolkit */

export default Form;
