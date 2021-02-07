// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCH_FAIL = 'FETCH_FAIL';
export const SAVE_RATES = 'SAVE_RATES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const saveEmail = (email) => ({
  type: LOGIN,
  email,
});

export const saveRates = (exchangeRates, currencies) => ({
  type: SAVE_RATES,
  exchangeRates,
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
      const currencies = Object.keys(jsonRes);
      dispatch(saveRates(jsonRes, currencies));
    } catch (error) {
      dispatch(fetchFail(error));
    }
  };
}

export const saveNewExpense = (expenses) => {
  const zero = 0;
  const totalExpenses = expenses.reduce((acc, currentExp) => {
    const { exchangeRates } = currentExp;
    const { currency } = currentExp;
    return acc + (Number(currentExp.value) * exchangeRates[currency].ask);
  }, zero);
  return ({
    type: UPDATE_EXPENSES,
    expenses,
    totalExpenses,
  });
};
