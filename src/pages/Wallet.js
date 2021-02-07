import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, saveNewExpense } from '../actions';
import Header from '../components/Header';

function Wallet({
  email,
  wallet: { currencies, exchangeRates, expenses, totalExpenses },
  fetchCurrencies,
  saveNewExpense,
}) {
  useEffect(() => {
    fetchCurrencies();
  }, []);

  const [form, setForm] = useState({
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const addExpense = async () => {
    await fetchCurrencies();
    const newExpenses = expenses.concat([{ ...form, exchangeRates }]);
    const nextState = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: form.id + 1,
    };
    saveNewExpense(newExpenses);
    setForm(nextState);
  };

  // if (currencies.length === 0) {
  //   return (
  //     <div>carregando</div>
  //   );
  // }

  return (
    <div>
      <Header email={ email } totalExpenses={ totalExpenses } />
      <div>
        <input
          data-testid="value-input"
          type="text"
          name="value"
          value={ form.value }
          onChange={ handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          value={ form.description }
          onChange={ handleChange }
        />
        <select
          data-testid="currency-input"
          type="text"
          name="currency"
          value={ form.currency }
          onChange={ handleChange }
        >
          {currencies.map((currency) => (
            <option
              key={ currency }
              value={ currency }
              data-testid={ currency }
            >
              {currency}
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ form.method }
          onChange={ handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ form.tag }
          onChange={ handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ addExpense }>
          Adicionar Despesa
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  email: state.user.email,
});

const mapDispatchToProps = {
  saveNewExpense,
  fetchCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
