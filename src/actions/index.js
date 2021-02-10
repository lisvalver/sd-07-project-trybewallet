import { currenciesAPI, fetchAll } from '../services/requestAPI';

export const addUserEmail = (value) => ({ type: 'EMAIL', value });

export const addExepenses = (value) => ({ type: 'EXPENSES', value });

export const deleteExp = (currentExpense) => ({
  type: 'DELETE',
  currentExpense,
});

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

    let totalExpenseConverted = (
      parseFloat(currentValue) * parseFloat(currentExchange.ask)
    );
    totalExpenseConverted = parseFloat(totalExpenseConverted.toFixed(2));

    dispatch(controllerExpenses(expensesObj));
    dispatch(addTotalExpense(totalExpenseConverted));
  };
}
