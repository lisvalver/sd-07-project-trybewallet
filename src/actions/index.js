// Coloque aqui suas actions
import {
  LOGIN_USER,
  REQUEST,
  REQUEST_SUCESS,
  REQUEST_FAILED,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  UPDATE_TOTAL_EXPENSES,
  UPDATE_EXPENSE,
  ENABLE_AND_DISABLE_UPDATE,
} from '../constants';

const loginAction = {
  addUser: (user) => ({
    type: LOGIN_USER,
    payload: user,
  }),
};

const walletAction = {
  requestAPI: () => ({ type: REQUEST }),
  requestSucess: (payload) => ({ type: REQUEST_SUCESS, payload }),
  requestFailed: (payload) => ({ type: REQUEST_FAILED, payload }),
  addExpense: (payload) => ({ type: ADD_EXPENSE, payload }),
  removeExpense: (payload) => ({ type: REMOVE_EXPENSE, payload }),
  updateExpense: (payload) => ({ type: UPDATE_EXPENSE, payload }),
  updateTotal: () => ({ type: UPDATE_TOTAL_EXPENSES }),
  enableAndDisableUpdate: () => ({ type: ENABLE_AND_DISABLE_UPDATE }),
};

const fetchAPI = () => async (dispatch) => {
  try {
    dispatch(walletAction.requestAPI());
    const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
    const objct = await endpoint.json();
    dispatch(walletAction.requestSucess(objct));
  } catch (error) {
    dispatch(walletAction.requestFailed(error));
  }
};

export { loginAction, walletAction, fetchAPI };
