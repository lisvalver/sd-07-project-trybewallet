const email = (value) => ({ type: 'ADD_EMAIL', value });

const editing = (obj) => ({ type: 'EDITING', obj });

const deleted = (id) => ({ type: 'DELETED', id });

function requestExpenses() { return ({ type: 'REQUEST' }); }

function addExpenses(value, valor) { return ({ type: 'ADD_EXPENSES', value, valor }); }

function failedRequest(value) { return ({ type: 'FAILED_REQUEST', value }); }

function expenses(objeto) {
  return async (dispatch) => {
    try {
      dispatch(requestExpenses());

      const expensesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const expensesJson = await expensesResponse.json();
      const newobjeto = {
        ...objeto,
        exchangeRates: expensesJson,
      };
      const arrayobj = Object.entries(expensesJson);
      const arrayfilter = arrayobj.filter((ele) => ele[0] === objeto.currency);
      const objobj = arrayfilter[0][1];
      const mult = objobj.ask;
      const floorvalue = 100000;
      const valormult = Math.floor(objeto.value * (mult * floorvalue)) / floorvalue;

      dispatch(addExpenses(newobjeto, valormult));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export { email, expenses, deleted, editing };
