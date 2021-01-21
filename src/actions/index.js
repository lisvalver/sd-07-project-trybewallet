export const LOGIN_OK = 'LOGIN_OK';
export const REQUEST_MOEDA = 'REQUEST_MOEDA';
export const REQUEST_MOEDA_SUCESS = 'REQUEST_MOEDA_SUCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const CHOOSED_CURRENCY = 'CHOOSED_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const SET_CONVERTED_VALUES = 'SET_CONVERTED_VALUES';
export const DELET_EXPENSES = 'DELET_EXPENSES';

export const currentLogin = (user) => ({
  type: 'LOGIN_OK',
  user,
});

export const requestMoeda = () => ({
  type: 'REQUEST_MOEDA',
});

const requestMoedaSucess = (payload) => ({
  type: 'REQUEST_MOEDA_SUCESS',
  payload,
});

const requestMoedaFail = (error) => ({
  type: 'REQUEST_FAIL',
  error,
});

export const currencyToStore = (payload) => ({
  type: 'CHOOSED_CURRENCY',
  payload,
});

export const addExpensesToStore = (payload) => ({
  type: 'ADD_EXPENSES',
  payload,
});

export const setRatesToStore = (payload) => ({
  type: 'SET_RATES',
  payload,
});

export const setConvertedValues = (payload) => ({
  type: 'SET_CONVERTED_VALUES',
  payload,
});

export const deleteExpense = (payload) => ({
  type: 'DELET_EXPENSES',
  payload,
});

export function fetchMoedaAPI() {
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
