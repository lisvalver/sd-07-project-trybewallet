// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, GET_CURRENCIES, POST_EXPENSES, DELETE } from "../actions";

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCIES:
      return {
        ...state,
        wallet: { ...state.wallet, currencies: action.payload },
      };
    case GET_CURRENCIES:
      return { ...state, currencies: action.payload };
    case POST_EXPENSES:
      return {...state, expenses: [...state.expenses, action.payload]}
    case DELETE:
      console.log('estou aqui')
      console.log(action.id)
      return {...state, expenses: state.expenses.filter(expense => expense.id !== parseInt(action.id))}
    default:
      return state;
  }
};

export default walletReducer;
