export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const NEW_EXPENSE_ARRAY = 'NEW_EXPENSE_ARRAY';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  currencies,
});

export const newExpenseArray = (newArray) => ({
  type: NEW_EXPENSE_ARRAY,
  newArray,
});
