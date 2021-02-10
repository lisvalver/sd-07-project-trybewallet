import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrencies, saveNewExpenses, setEditing } from '../actions';
// O Header foi retirado do Alvaro, utilizado para estilo
// Achei mais conveniente utilizar o projeto dele como base
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';

// A cahamada de API foi a base da explicação do Pedro Marques
function Wallet({
  email,
  wallet: { editing, currencies, exchangeRates, expenses, totalExpenses },
  fetchData,
  saveExpenses,
  setEdit,
}) {
  useEffect(() => {
    fetchData();
  }, []);

  const [form, setForm] = useState({
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: {},
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const addExpense = async () => {
    const nextState = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: form.id + 1,
      exchangeRates: {},
    };
    if (!editing) {
      await fetchData();
      const newExpenses = expenses.concat([{ ...form, exchangeRates }]);
      saveExpenses(newExpenses);
      setForm(nextState);
    } else {
      const nextId = expenses[expenses.length - 1].id + 1;
      const filteredExpenses = expenses.filter((expense) => expense.id !== form.id);
      const newExpenses = filteredExpenses;
      newExpenses.splice(form.id, 0, form);
      setEdit(false);
      saveExpenses(newExpenses);
      setForm({ ...nextState, id: nextId });
    }
  };

  const handleEditClick = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setForm(expenseToEdit);
    setEdit(true);
  };

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
          {editing ? 'Editar despesa' : 'Adicionar Despesa'}
        </button>
      </div>
      <ExpensesTable expenses={ expenses } handleEditClick={ handleEditClick } />
    </div>
  );
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(saveNewExpenses(expenses)),
  fetchData: () => dispatch(fetchCurrencies()),
  setEdit: (editing) => dispatch(setEditing(editing)),
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  fetchData: propTypes.func.isRequired,
  saveExpenses: propTypes.func.isRequired,
  setEdit: propTypes.func.isRequired,
  wallet: propTypes.shape({
    editing: propTypes.bool,
    currencies: propTypes.arrayOf(propTypes.string),
    exchangeRates: propTypes.objectOf(propTypes.object),
    expenses: propTypes.arrayOf(propTypes.object),
    totalExpenses: propTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
