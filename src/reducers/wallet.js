// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { REQUEST_API_SUCCESS,
  REQUEST_EXPENSES,
  REQUEST_CURRENCY,
} from '../actions/index';

const INITIAL_VALUE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

function wallet(state = INITIAL_VALUE, action) {
  switch (action.type) {
  // estou fazendo a requisição, espere.
  case REQUEST_CURRENCY:
    return { ...state,
      isFetching: true };
  // terminei a requisição, receba o objeto
  case REQUEST_API_SUCCESS:
    return { ...state, currencies: { ...action.value }, isFetching: false };
  case REQUEST_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.value] };
  default:
    return state;
  }
}

export default wallet;
