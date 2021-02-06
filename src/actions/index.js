// Coloque aqui suas actions
export const ENTERWALLET = 'ENTERWALLET';
export const REQUEST_MOEDA = 'REQUEST_MOEDA';
export const REQUEST_MOEDA_SUCCESS = 'REQUEST_MOEDA_SUCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELET_EXPENSE = 'DELET_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ADD_EDIT_EXPENSE = 'ADD_EDIT_EXPENSE';

export const enterWallet = (email) => ({
  type: ENTERWALLET,
  email,
});

export const requestMoeda = () => ({
  type: REQUEST_MOEDA,
});

const requestMoedaSucess = (success) => ({
  type: REQUEST_MOEDA_SUCCESS,
  success,
});

const requestMoedaFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const deleteExpenses = (expenseID) => ({
  type: DELET_EXPENSE,
  expenseID,
});

export const editExpenses = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const addEditExpenses = (payload, id) => ({
  type: ADD_EDIT_EXPENSE,
  payload,
  id,
});

export function fetchMoeda() {
  return (dispatch) => {
    dispatch(requestMoeda());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => {
        response.json().then(
          (data) => dispatch(requestMoedaSucess(data)),
          (error) => dispatch(requestMoedaFail(error)),
        );
      });
  };
}
