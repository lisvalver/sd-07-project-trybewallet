import getCurrencies from '../services/currencyAPI';

const ADD_USER = 'ADD_USER';
const ADD_EXPENSE = 'ADD_EXPENSE';
const ADD_CURRENCY = 'ADD_CURRENCY';
const DEL_EXPENSE = 'DEL_EXPENSE';
const LOADING = 'LOADING';

export { ADD_USER, ADD_EXPENSE, ADD_CURRENCY, DEL_EXPENSE, LOADING };

export const LOGIN = (email) => ({ type: ADD_USER, email });

export const ISLOADING = (loading) => ({ type: LOADING, loading });

export const CURRENCIES = (currencies) => ({ type: ADD_CURRENCY, currencies });

export const EXPENSE = (expenses) => ({ type: ADD_EXPENSE, expenses });

export const DELEXPENSE = (id) => ({ type: DEL_EXPENSE, id });

export function FETCHCODE() {
  return async (dispatch) => {
    const endPoint = 'https://economia.awesomeapi.com.br/json/all';
    const update = await getCurrencies(endPoint);
    dispatch(CURRENCIES(update));
    dispatch(ISLOADING(false));
  };
}
