export const USER_EMAIL = 'USER_EMAIL';
export const ADD_EXPENSES = 'USER_EXPENSES';
export const ADD_AMOUNT = 'USER_AMOUNT';

export const emailUser = (email) => ({
  type: USER_EMAIL,
  email,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const addAmount = (amount) => ({
  type: ADD_AMOUNT,
  amount,
});
