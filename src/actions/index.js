// Coloque aqui suas actions
import types from '../services/actionTypes';

const emailState = (email, log) => (
  {
    type: types.LOG_EMAIL,
    email,
    log,
  });

export default emailState;

export const API = (prices) => (
  {
    type: types.RESPONSE,
    prices,
  });

const APIURL = 'https://economia.awesomeapi.com.br/json/all';

export const CurrenciesAction = () => async (dispatch) => {
  // dispatch(requestAPI());
  const fetchRequest = await fetch(APIURL);
  const jsonResponse = await fetchRequest.json();
  delete jsonResponse.USDT;
  dispatch(API(jsonResponse));
};

export const expenses = (objExpenses, objApi) => (
  {
    type: types.EXPENSES,
    objExpenses,
    objApi,
  });

export const ActionEx = (objExpenses) => async (dispatch) => {
  const fetchRequest = await fetch(APIURL);
  const objApi = await fetchRequest.json();
  dispatch(expenses(objExpenses, objApi));
};

export const ActionExpenseDelete = (id) => (
  {
    type: types.DELETE_EXPENSE,
    id,
  });

export const btnAction = (toogle, objExpenses) => (
  {
    type: types.EDIT_BTN,
    objExpenses,
    toogle,
  });

export const editAction = (objExpenses) => (
  {
    type: types.EDIT_EXPENSE,
    objExpenses,
  });
