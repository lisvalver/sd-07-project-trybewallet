const addEmail = (emailValue) => ({
  type: 'ADD_EMAIL',
  value: emailValue,
});

const addExpense = (expenseValue, total) => ({
  type: 'ADD_EXPENSE',
  value: expenseValue,
  total,
});

const editExpense = (obj) => ({
  type: 'EDIT_EXPENSE',
  value: obj,
});

const delExpense = (id) => ({
  type: 'DEL_EXPENSE',
  id,
});

function expenseTotal(expense) {
  return async (dispatch) => {
    const expenseResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const expenseJSON = await expenseResponse.json();
    const newObject = { ...expense, exchangeRates: expenseJSON };
    const arrnewObject = Object.entries(expenseJSON);
    const newFilter = arrnewObject.filter((element) => element[0] === expense.currency);
    const objectReturn = newFilter[0][1];
    const multi = objectReturn.ask;
    const refinamento = 100000;
    const total = Math.floor(expense.value * (multi * refinamento)) / refinamento;
    dispatch(addExpense(newObject, total));
  };
}

export { addEmail, addExpense, expenseTotal, editExpense, delExpense };
