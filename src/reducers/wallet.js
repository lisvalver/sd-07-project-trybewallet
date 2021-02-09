const INITIAL_STATE = {
  total: 0,
  currencies: [],
  expenses: [],
};

function meuTotal(arr) {
  const aTotal = arr
    .map((expense) => expense.value * expense.exchangeRates[expense.currency].ask);
  let total = 0;
  for (let i = 0; i < aTotal.length; i += 1) {
    total += aTotal[i];
  }
  return total;
}

function wallet(state = INITIAL_STATE, action) {
  const newExpense = [...state.expenses];
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      expenses: [...newExpense, action.value],
      total: meuTotal([...newExpense, action.value]),
    };
  case 'EDIT_EXPENSE':
    newExpense[action.value.id] = action.value;
    return { ...state, expenses: newExpense, total: meuTotal(newExpense) };
  case 'DEL_EXPENSE':
    newExpense.splice(action.id, 1);
    return { ...state, expenses: newExpense, total: meuTotal(newExpense) };
  default:
    return state;
  }
}

export default wallet;
