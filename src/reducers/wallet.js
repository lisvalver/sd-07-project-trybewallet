const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
const FAILED_REQUEST = 'FAILED_REQUEST';
const ADD_EXPENSE = 'ADD_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

const INITIAL_STATE = {
  currencies: [],
  error: '',
  expenses: [],
  total: 0,  
};

function addExpense(state = {}, action = {}) {
  const expenses = state.expenses.concat([
    {
      id: state.expenses.length, ...action.expense,
    },
  ]);
  return {
    ...state,
    expenses,
    total: expenses.reduce((acc, expense) => {
      const currency = expense.exchangeRates[expense.currency];
      acc += parseFloat((parseFloat(expense.value) * currency.ask).toFixed(2));
      return acc;
    }, 0),
  };
}

function deleteExpense(state = {}, action = {}) {
  const filteredExpenses = state.expenses.filter((item) => item.id !== action.expense.id);
  return {
    ...state,
    expenses: filteredExpenses,
    total: filteredExpenses.reduce((acc, expense) => {
      const currency = expense.exchangeRates[expense.currency];
      acc += parseFloat((parseFloat(expense.value) * currency.ask).toFixed(2));
      return acc;
    }, 0),
  };
}

function editExpense(state = {}, action = {}) {
  console.log('OI', action.expense);  
  const oldExpense = state.expenses.filter((item) => item.id === action.expense.id);
  console.log(oldExpense)
  const changeExpense = [...state.expenses];
  const index = changeExpense.indexOf(oldExpense[0])
  console.log(index)  ;
  changeExpense[index] = action.expense;
  console.log(changeExpense);  
  return {
    ...state,
    expenses: changeExpense,
    total: changeExpense.reduce((acc, expense) => {
      const currency = expense.exchangeRates[expense.currency];
      acc += parseFloat((parseFloat(expense.value) * currency.ask).toFixed(2));
      return acc;
    }, 0),
  };
}

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state, currencies: action.currency,
    };
  case FAILED_REQUEST:
    return {
      ...state, error: action.error,
    };
  case ADD_EXPENSE:
    return addExpense(state, action);
  case DELETE_EXPENSE:
    return deleteExpense(state,action);
  case EDIT_EXPENSE:
    return editExpense(state, action);
  default:
    return state;
  }
}

export default wallet;
