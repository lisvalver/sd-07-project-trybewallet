import * as actionTypes from '../actions/actionTypes';

const initialState = {
  money: 0,
  currencies: [],
  expenses: [],
  id: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_EXPENSE:
      const expense = action.expense;
      const currency = expense.exchangeRates[expense.currency]
      expense.id = state.id;
      let newTotal = + expense.value * currency.ask + state.money
      return {
        ...state,
        expenses: state.expenses.concat(expense),
        money: newTotal,
        id: state.id + 1
      }
      case actionTypes.REMOVE_EXPENSE:
        var elementPos = state.expenses.map((elem) => elem.id).indexOf(action.id);
        const expenses = [...state.expenses]
        expenses.splice(elementPos, 1);
        return {
          ...state,
          expenses: expenses,
        }
      case actionTypes.POPULATE_CURRENCIES:
        return {
          ...state,
          currencies: action.currencies
        }
    default: return state;   
  }
}

export default reducer
