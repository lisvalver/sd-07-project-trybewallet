import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { fetchCurrency, fetchUserCurrency, userValue } from '../actions/index';
import { optionMethod, optionTag } from './FormOptions';
import store from '../store/index';

const Form = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrency());
  }, []);
  const [expenses, setExpenses] = useState([]);
  const { wallet, userCurrency, userSum } = props;

  const { value } = expenses;

  const handleChange = (event) => {
    const { target } = event;
    setExpenses((previous) => ({
      ...previous,
      [target.name]: target.value,
    }));
  };

  async function handleClick() {
    await userCurrency(expenses);
    const currency1 = store.getState().wallet.expenses;
    let matchCurrency;
    let sumValue = 0;
    currency1.forEach((element, index) => {
      matchCurrency = Object.values(currency1[index].exchangeRates)
        .find((element2) => element.currency === element2.code);
      sumValue += matchCurrency.ask * value;
    });
    userSum(sumValue);
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
            onClick={ handleClick }
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (stor) => ({
  wallet: stor.wallet,
});

const mapDispatchToProps = {
  userCurrency: fetchUserCurrency,
  userSum: userValue,
};

Form.propTypes = {
  wallet: PropTypes.shape().isRequired,
  userCurrency: PropTypes.func.isRequired,
  userSum: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
