export const USER_EMAIL = 'USER_EMAIL';
export const ADD_EXPENSES = 'USER_EXPENSES';

export const emailUser = (email) => ({
  type: USER_EMAIL,
  email,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});
