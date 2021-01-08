// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCE,
  REQUEST_CURRENCE,
  FAILED_REQUEST,
  SAVED_EXPENSE,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCE:
    return { ...state, isFetching: true };
  case GET_CURRENCE:
    return { ...state, currencies: action.payload, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, currencies: action.payload, isFetching: false };
  case SAVED_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  default:
    return state;
  }
}
