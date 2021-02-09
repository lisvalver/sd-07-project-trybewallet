import * as actionTypes from '../actions/actionTypes';

const initialState = {
  money: 0,
  currencies: [],
  expenses: [],
  id: 0,
};

const reducer = (state = initialState, action) => {
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
    return {
      ...state,
      expenses: [...state.expenses].filter((elem) => elem.id !== action.id),
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
