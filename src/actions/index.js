import { currenciesAPI, fetchAll } from '../services/requestAPI';

export const addUserEmail = (value) => ({ type: 'EMAIL', value });

export const addExepenses = (value) => ({ type: 'EXPENSES', value });

export const availableCurrencies = (value) => ({
  type: 'CURRENCIES',
  value,
});

export const requestInProgress = () => ({
  type: 'REQUEST_IN_PROGRESS',
});

export const controllerExpenses = (value) => ({
  type: 'EXPENSES',
  value,
});

export const addTotalExpense = (value) => ({
  type: 'AMOUNT',
  value,
});

export function fetchCurrencies() {
  return async (dispacth) => {
    dispacth(requestInProgress());

    const data = await currenciesAPI();
    dispacth(availableCurrencies(data));
  };
}

export function saveExpenses(expensesObj) {
  return async (dispatch) => {
    dispatch(requestInProgress());

    const data = await fetchAll();
    expensesObj.exchangeRates = data;

    const currentValue = expensesObj.value;
    const currentExchange = data[expensesObj.currency];
    // const exchangeFormated = parseFloat(currentExchange.ask).toFixed(2);

    let totalExpenseConverted = (
      parseFloat(currentValue) * parseFloat(currentExchange.ask)
    );
    totalExpenseConverted = parseFloat(totalExpenseConverted.toFixed(2));

    // expensesObj.currentExpenseConverted = parseFloat(totalExpenseConverted.toFixed(2));
    // expensesObj.currentExchange = exchangeFormated;

    dispatch(controllerExpenses(expensesObj));
    dispatch(addTotalExpense(totalExpenseConverted));
  };
}
