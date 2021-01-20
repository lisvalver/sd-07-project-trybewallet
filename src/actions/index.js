import callApi from '../services/callApi';

export const LOGIN = 'LOGIN';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const ADDTOTAL = 'ADDTOTAL';

export const addTotal = (total) => ({
  type: ADDTOTAL,
  total,
});

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const fetchCurrencies = (currencies) => ({
  type: FETCH_CURRENCIES,
  currencies,
});

export const fetchingCurrencies = () => (dispatch) => {
  callApi().then((r) => {
    dispatch(fetchCurrencies(r));
  });
};

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});

export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const editExpenses = (expenses, id) => ({
  type: EDIT_EXPENSES,
  id,
  expenses,
});

export const DELETE = 'DELETE';

export const deleteThis = (id) => ({
  type: DELETE,
  id,
});

export const THIS_EDITING = 'THIS_EDITING';

export const thisEditing = (change) => ({
  type: THIS_EDITING,
  change,
});
export const ADD_EDICAO = 'ADD_EDICAO';

export const addEdicao = (expense) => ({
  type: ADD_EDICAO,
  expense,
});

export function fetchingDespesa(despesa) {
  return async (dispatch) => {
    const response = await callApi();
    const novaDespesa = { ...despesa, exchangeRates: response };
    (dispatch(saveExpenses(novaDespesa)));
    (dispatch(addTotal()));
  };
}
