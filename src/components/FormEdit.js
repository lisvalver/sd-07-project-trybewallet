import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { optionMethod, optionTag } from './FormOptions';
import { userIsEditing, userEdit } from '../actions/index';

const FormEdit = () => {
  const [expense, setExpense] = useState({});
  const editing = useSelector((edit) => edit.wallet.isEditing);
  const wallet = useSelector((wallet1) => wallet1.wallet);
  const dispatch = useDispatch();

  function handleChange(event) {
    const { target } = event;
    setExpense((previous) => ({
      ...previous,
      [target.name]: target.value,
    }));
  }

  function handleSubmit() {
    dispatch(userIsEditing(expense));
    dispatch(userEdit('', !editing));
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              defaultValue="0"
              data-testid="value-input"
              onChange={ (event) => handleChange(event) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              onChange={ (event) => handleChange(event) }
            >
              <option defaultValue value="">
                Sua escolha
              </option>
              {wallet.currencies.map((currie, index) => (
                <option data-testid={ currie } key={ index }>{currie}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ (event) => handleChange(event) }
            >
              <option defaultValue value="">
                Sua escolha
              </option>
              {optionMethod.map((metod, index) => (
                <option key={ index }>{metod}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ (event) => handleChange(event) }
            >
              <option defaultValue value="">
                Sua escolha
              </option>
              {optionTag.map((tag, index) => (
                <option key={ index }>{tag}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição:
            <textarea
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
              onChange={ (event) => handleChange(event) }
            />
          </label>
        </div>
        <div>
          <button
            type="reset"
            className="btn btn-outline-success"
            onClick={ handleSubmit }
          >
            Editar despesa
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEdit;
