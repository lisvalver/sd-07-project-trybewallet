export const login = (value) => ({ type: 'LOGIN', value });
export const fetchRequest = () => ({ type: 'FETCH_REQUEST' });
export const fetchFail = (value) => ({ type: 'FETCH_FAIL', value });
export const fetchExchangeRatesSuccess = (value) => (
  { type: 'FETCH_EXCHANGE_RATES_SUCCESS', value });
export const addExpense = (value) => ({ type: 'ADD_EXPENSE', value });
export const deleteExpense = (value) => ({ type: 'DELETE_EXPENSE', value });

async function fetchAPI() {
  const api = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

export function fetchExchangeRates() {
  return (dispatch) => {
    dispatch(fetchRequest());
    return fetchAPI()
      .then((data) => {
        dispatch(fetchExchangeRatesSuccess({ ...data }));
      },
      (error) => dispatch(fetchFail(error)));
  };
}
