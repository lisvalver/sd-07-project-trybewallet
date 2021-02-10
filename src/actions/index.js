const ADD_EXPENSE = 'ADD_EXPENSE';
const DEL_EXPENSE = 'DEL_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const TOTAL_EXPENSE = 'TOTAL_EXPENSE';
const STATEEDIT_EXPENSE = 'STATEEDIT_EXPENSE';
const ADD_ALTERED_EXPENSE = 'ADD_ALTERED_EXPENSE';

export const delExpenseAction = (value) => ({ type: DEL_EXPENSE, value });

export const editExpenseAction = (value) => ({ type: EDIT_EXPENSE, value });

export const totalExpenseAction = (value) => ({ type: TOTAL_EXPENSE, value });

export const addExpenseAction = (value) => ({ type: ADD_EXPENSE, value });

export const stateEditExpenseAction = (value) => ({ type: STATEEDIT_EXPENSE, value });

export const addAlteredExpenseAction = (value) => ({ type: ADD_ALTERED_EXPENSE, value });

export const USER = 'EMAIL';

export const login = (value) => ({ type: USER, value });
