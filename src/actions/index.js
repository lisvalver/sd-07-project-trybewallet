// Coloque aqui suas actions
import getCurrenciesApi from '../services/CurrencyAPI';

export const EMAIL = 'EMAIL';
export const CURRENCIES = 'CURRENCIES';
export const EXPENSES = 'EXPENSES';

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const POST_EXPENSES = 'POST_EXPENSES';

export const DELETE = 'DELETE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const saveUserEmail = (payload) => ({
  type: EMAIL,
  payload,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

const requestCurrencies = () => ({ type: REQUEST_CURRENCIES });

const failedRequest = (error) => ({ type: FAILED_REQUEST, payload: error });

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      console.log('trying');
      dispatch(requestCurrencies);
      const currencyArray = [];

      const currenciesRes = await getCurrenciesApi();
      const convertToArray = Object.entries(currenciesRes);
      convertToArray.forEach((currency) => currencyArray.push(currency[1]));
      const finalCurrencies = currencyArray.filter(
        (currency) => currency.name !== 'Dólar Turismo',
      );

      dispatch(getCurrencies(finalCurrencies));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}

export const postExpenses = (expense) => ({
  type: POST_EXPENSES,
  payload: expense,
});

export function saveExpenseAction(expense) {
  return async (dispatch) => {
    try {
      dispatch(requestCurrencies);

      const currenciesRes = await getCurrenciesApi();
      expense.exchangeRates = currenciesRes;

      dispatch(postExpenses(expense));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}

export const deleteExpense = (id) => ({
  type: DELETE,
  id,
});

export const updateExpense = (expenseItem) => ({
  type: UPDATE_EXPENSE,
  payload: expenseItem,
});
