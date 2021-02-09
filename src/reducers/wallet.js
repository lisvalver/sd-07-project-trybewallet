/* consultei o repositório do Vigilio para refatorar todo meu arquivo Wallet.js
https://github.com/tryber/sd-07-project-trybewallet
/pull/25/files?file-filters%5B%5D=.js&file-filters%5B%5D=.json */
import {
  GET_CURRENCIES,
  ADD_EXPENSES,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function somaTotal(arr) {
  return arr.reduce(
    (total, atual) => total
      + parseFloat(atual.value)
        * parseFloat(atual.exchangeRates[atual.currency].ask),
    0,
  );
}

const userWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.currenciesAPI };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.newExpense],

      total: somaTotal([...state.expenses, action.newExpense]),
    };
  case DELETE_EXPENSES:
    return {
      ...state,

      expenses: state.expenses.filter((expense) => expense.id !== action.id),
      total: somaTotal(
        state.expenses.filter((expense) => expense.id !== action.id),
      ),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.editedExpense.id) {
          return action.editedExpense;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default userWallet;
