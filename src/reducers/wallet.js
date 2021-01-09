// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from '../actions/asyncAction';

// 1 - criar o estado inicial
const initialState = {
  loading: false,
  currencies: [],
  expenses: [],
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case FETCH_REQUEST:
    return { ...state, loading: true };
  case FETCH_SUCCESS:
    return {
      ...state,
      loading: false,
      currencies: action.payload.data,
      error: '',
    };
  case FETCH_FAILURE:
    return {
      ...state,
      loading: false,
      currencies: [],
      error: action.payload,
    };
  default:
    return state;
  }
}
