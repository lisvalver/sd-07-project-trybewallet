// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import types from '../actions/types';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  total: 0,
  isFetching: false,
};

function wallet(state = INITIAL_STATE, action) {
  const qualquerNome = [...state.expenses];
  switch (action.type) {
  case types.REQUEST_SUCCES:
    return {
      ...state,
      isFetching: true,
    };
  case types.RECIVE_SUCCES:
    return {
      ...state,
      isFetching: false,
      currencies: action.value,
    };
  case types.RECIVE_FAIL:
    return {
      ...state,
      isFetching: false,
      error: 'error',
    };
  case types.ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case types.DELETE_EXPENSES:
    return ({
      ...state,
      expenses: action.expenses,
    });

  case types.ADD_ACTION_FORM:
    qualquerNome[action.expenses.id] = action.expenses;
    return ({
      ...state,
      expenses: qualquerNome,
    });
  default:
    return state;
  }
}

export default wallet;
