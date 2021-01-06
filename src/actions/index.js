export const changeEmail = (email) => ({
  type: 'LOGIN',
  email,
});

export const addExpenses = (expense) => ({
  type: 'CHANGE',
  expense,
});

export const chargeCurrencies = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});
