// Coloque aqui suas actions
export const USER = 'USER';

export const addUser = (data) => (
  {
    type: USER,
    data,
  }
);

export const addExpense = (data) => (
  {
    type: 'EXPENSE',
    data,
  }
);

export const removeExpense = (data) => (
  {
    type: 'REMOVE_EXPENSE',
    data,
  }
);

export function getCurrencies(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    expense.exchangeRates = data;
    dispatch(addExpense(expense));
  };
}
