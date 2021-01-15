export const ADD_CUREENCIES = 'ADD_CURRENCIES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const addCurrencies = (currencies) => (
  { type: ADD_CUREENCIES, currencies }
);

export const editExpense = (expense) => (
  { type: EDIT_EXPENSE, expense }
);

export const addExpense = (expense) => (
  { type: ADD_EXPENSE, expense }
);

export const deletExpense = (expense) => (
  { type: DELETE_EXPENSE, expense }
);
