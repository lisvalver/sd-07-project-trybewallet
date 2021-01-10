import { ADD_EXPENSE } from '../actions';
import {
  GET_CURRENCIES, // REQUEST_CURRENCIES, FAILED_REQUEST,
} from '../actions/fetchCurrencies';

const INITIAL_STATE = { expenses: [], currencies: {} };

function wallet(state = INITIAL_STATE, action) {
  const id = state.expenses.length;
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload, id },
      ],
    };
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  /* case REQUEST_CURRENCIES:
   Object.assign([], currencies);
    return console.log('requestCurrencies');
  case FAILED_REQUEST:
    console.log('falhou');
    break; */
  default:
    return state;
  }
}

export default wallet;
