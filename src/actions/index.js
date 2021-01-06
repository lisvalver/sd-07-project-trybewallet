const email = (value) => ({ type: 'ADD_EMAIL', value });

function requestExpenses() { return ({ type: 'REQUEST_EXPENSES' }); }

function addExpenses(value) { return ({ type: 'ADD_EXPENSES', value }); }

function failedRequest(value) { return ({ type: 'FAILED_REQUEST', value }); }

function expenses() {
  return async (dispatch) => {
    try {
      dispatch(requestExpenses);

      const expensesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const expensesJson = await expensesResponse.json();

      dispatch(addExpenses(expensesJson));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export { email, expenses };
