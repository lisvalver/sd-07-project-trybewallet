const addEmail = (email) => ({
  type: 'ADD_EMAIL',
  value: email,
});

const changeFetching = () => ({
  type: 'FETCHING',
});

const addExpense = (newObject, total) => ({
  type: 'ADD_EXPENSE',
  value: newObject,
  total,

});

const deleteExpense = (id) => ({
  type: 'DEL_EXPENSE',
  id,
});

const editeExpense = (object) => ({
  type: 'EDIT_EXPENSE',
  value: object,
});

function addExpenseTotal(expense) {
  return async (dispatch) => {
    dispatch(changeFetching());
    const expenseResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const expenseJSON = await expenseResponse.json();
    const newObject = { ...expense, exchangeRates: expenseJSON };
    const arrayObj = Object.entries(expenseJSON);
    const arrFilter = arrayObj.filter((element) => element[0] === expense.currency);
    const objReturn = arrFilter[0][1];
    const mult = objReturn.ask;
    const refine = 100000;
    const total = Math.floor(expense.value * (mult * refine)) / refine;
    dispatch(addExpense(newObject, total));
  };
}

export { addEmail, addExpenseTotal, deleteExpense, editeExpense };
