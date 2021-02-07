// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES } from '../actions';
import { ADD_EXPENSES } from '../actions';
import { DELETE_EXPENSES } from '../actions';
import { EDIT_EXPENSES } from '../actions';

// import { GET_ALL_OBJECTS } from '../actions'

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function somaTotal(arr) {
  return arr.reduce(
    (total, atual) =>
      total +
      parseFloat(atual.value) *
        parseFloat(atual.exchangeRates[atual.currency].ask),
    0
  );
}

const userWallet = (state = INITIAL_STATE, action) => {
  // const newExpense = [...state.expenses];
  switch (action.type) {
    case GET_CURRENCIES:
      return { ...state, currencies: action.currenciesAPI };
    case ADD_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, action.newExpense],
        // expenses: [ state.expenses.concat(action.value) ],
        total: somaTotal([...state.expenses, action.newExpense]),
      };
    case DELETE_EXPENSES:
      return {
        ...state,
        // expenses: "oi"
        expenses: state.expenses.filter((expense) => expense.id !== action.id),
        total: somaTotal(
          state.expenses.filter((expense) => expense.id !== action.id)
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
// o export default é o principal, é oq é chamado quando tem o import
