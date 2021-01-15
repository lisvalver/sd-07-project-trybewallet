import getCurrencies from '../services/currencyAPI';

const ADD_USER = 'ADD_USER';
export const LOGIN = (email) => ({ type: ADD_USER, email });

const LOADING = 'LOADING';
export const ISLOADING = (loading) => ({ type: LOADING, loading });

const ADD_CURRENCY = 'ADD_CURRENCY';
export const CURRENCIES = (currencies) => ({ type: ADD_CURRENCY, currencies });

const ADD_EXPENSE = 'ADD_EXPENSE';
export const EXPENSE = (expenses) => ({ type: ADD_EXPENSE, expenses });

const DEL_EXPENSE = 'DEL_EXPENSE';
export const DELEXPENSE = (expense) => ({ type: DEL_EXPENSE, expense });

export { ADD_USER, ADD_EXPENSE, ADD_CURRENCY, DEL_EXPENSE, LOADING };

export function FETCHCODE() {
  return async (dispatch) => {
    const endPoint = 'https://economia.awesomeapi.com.br/json/all';
    const update = await getCurrencies(endPoint);
    dispatch(CURRENCIES(update));
    dispatch(ISLOADING(false));
  };
}
