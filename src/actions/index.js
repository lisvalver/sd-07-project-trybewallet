// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCH_FAIL = 'FETCH_FAIL';

export const saveEmail = (email) => ({
  type: LOGIN,
  email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const fetchStart = () => ({ type: FETCHING_DATA });

export const fetchFail = (error) => ({ type: FETCH_FAIL, error });

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(fetchStart);
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const jsonRes = await response.json();
      delete jsonRes.USDT;
      dispatch(saveCurrencies(jsonRes));
    } catch (err) {
      dispatch(fetchFail(err.message));
    }
  };
}
