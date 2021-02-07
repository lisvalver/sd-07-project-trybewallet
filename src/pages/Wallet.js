import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';
import Header from '../components/Header';

function Wallet({ email, wallet: { currencies, rates, totalExpenses }, fetchData}) {
  useEffect(() => {
    fetchData();
  }, []);

  const [form, setForm] = useState({
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  if (!currencies) {
    return (
      <div>carregando</div>
    );
  }

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
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
