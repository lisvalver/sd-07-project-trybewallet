export function login(email) {
  return ({
    type: 'LOGIN',
    email,
  });
}

function requestCurrencies() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
}

function sendExpense(object) {
  return ({
    type: 'ADD_EXPENSE',
    expense: object,
  });
}

export function addExpense(object) {
  return async (dispatch) => {
    const currencies = await requestCurrencies();
    object.exchangeRates = currencies;
    return dispatch(sendExpense(object));
  };
}

export function updateExpenses(array) {
  return ({
    type: 'UPDATE_EXPENSES',
    updatedExpenses: array,
  });
}

export const editingExpenseAction = (idInEditing, bool) => ({
  type: 'EDITING_EXPENSE',
  idInEditing,
  bool,
});

export const editedExpenseAction = (expense, bool) => ({
  type: 'EDITED_EXPENSE',
  expense,
  bool,
});
