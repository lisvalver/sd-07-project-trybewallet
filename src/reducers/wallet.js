// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EXPENSE, UPDATE_TOTAL_EXPENSE, DELETE_EXPENSE, EDIT_INFO, UPDATE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  nextId: 0,
  totalExpenses: 0,
  editInfo:{},
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE: {
    const value = state.expenses;
    const newValue = [action.value];
    return { ...state,
      expenses: value.concat(newValue),
      nextId: state.nextId + 1,
    };
  }
  case UPDATE_TOTAL_EXPENSE: {
    const sum = state.totalExpenses + action.value;
    return { ...state, totalExpenses: sum };
  }
  case DELETE_EXPENSE: {
    const oldExpenses = state.expenses;
    const atualExpenses = oldExpenses.filter((expense) => expense.id !== action.id);
    return { ...state,
      expenses: atualExpenses,
    };
  }
  case EDIT_INFO:
    const info = state.expenses.find((expense) => expense.id === action.id);
    return { ...state, editInfo: info };
  case UPDATE_EXPENSE: {
    const update = state.expenses.map((expense) => {
      if (expense.id === action.payload.id) {
        return { ...expense, ...action.payload}
      }
      return expense;
    })
    return { ...state, expenses: update,}
  }
  default:
    return state;
  }
}

export default wallet;
