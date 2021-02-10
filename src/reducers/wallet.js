import * as actionTypes from '../actions/actionTypes';

const initialState = {
  money: 0,
  currencies: [],
  expenses: [],
  id: 0,
};

const reducer = (state = initialState, action) => {
  let expense = null;
  let expenses = [];
  let valueDelta = 0;
  switch (action.type) {
  case actionTypes.ADD_EXPENSE:
    action.expense.id = state.id;
    return {
      ...state,
      expenses: state.expenses.concat(action.expense),
      money:
        action.expense.value
        * action.expense.exchangeRates[action.expense.currency].ask + state.money,
      id: state.id + 1,
    };
  case actionTypes.REMOVE_EXPENSE:
    expense = [...state.expenses].filter((elem) => elem.id === action.id)[0];
    return {
      ...state,
      expenses: [...state.expenses].filter((elem) => elem.id !== action.id),
      money: state.money
      - (expense.value * expense.exchangeRates[expense.currency].ask),
    };
  case actionTypes.EDIT_EXPENSE:
    expenses = [...state.expenses];
    expense = expenses.filter((elem) => elem.id === action.expense.id)[0];
    valueDelta = action.expense.value
    * action.expense.exchangeRates[action.expense.currency].ask
    - expense.value * expense.exchangeRates[expense.currency].ask;
    expense.value = action.expense.value;
    expense.currency = action.expense.currency;
    expense.exchangeRates = action.expense.exchangeRates;
    expense.method = action.expense.method;
    expense.tag = action.expense.tag;
    expense.description = action.expense.description;
    expenses.splice(expenses.indexOf(expense), 1, expense);
    return {
      ...state,
      expenses,
      money: state.money + valueDelta,
    };
  case actionTypes.POPULATE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  default: return state;
  }
};

export default reducer;
