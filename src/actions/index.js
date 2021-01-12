export const login = (email) => ({ type: 'LOGIN', email });

const addExpenses = (addExpense) => ({ type: 'ADD_EXPENSE', addExpense });

const getCurrencies = (currenciesApi) => ({ type: 'GET_CURRENCY', currenciesApi });

const fetchCurrency = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
);

export function getCurrency() {
  return async (dispatch) => {
    fetchCurrency().then((response) => dispatch(getCurrencies(response)));
  };
}

export function addDebitsToExpenses(currencies) {
  return async (dispatch) => {
    const getAPI = await fetchCurrency();
    currencies.exchangeRates = getAPI;
    return dispatch(addExpenses(currencies));
  };
}
