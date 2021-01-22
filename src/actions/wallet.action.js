export const ADD_CUREENCIES = 'ADD_CURRENCIES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const EDITEX_UPDATE = 'EDITEX_UPDATE';

export const addCurrencies = (currencies) => (
  { type: ADD_CUREENCIES, currencies }
);

export const editExpense = (editEx) => (
  { type: EDIT_EXPENSE, editEx }
);

export const addExpense = (expenses) => (
  { type: ADD_EXPENSE, expenses }
);

export const deletExpense = (expense) => (
  { type: DELETE_EXPENSE, expense }
);

export const updateExpense = (upEx) => (
  { type: UPDATE_EXPENSE, upEx }
);

export const editExUpdate = (updateEx, label, newValue) => (
  { type: EDITEX_UPDATE, updateEx, label, newValue }
);
