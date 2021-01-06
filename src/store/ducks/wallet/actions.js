import walletTypes from './types';

const request = () => ({
  type: walletTypes.REQUEST,
});

const receive = (currencies) => ({
  type: walletTypes.RECEIVE,
  payload: currencies,
});

const failedRequest = (error) => ({
  type: walletTypes.FAILED_REQUEST,
  payload: error,
});

const addExpense = () => ({
  type: walletTypes.ADD,
});

const editExpenses = () => ({
  type: walletTypes.EDIT,
});

const deleteExpense = (id) => ({
  type: walletTypes.DELETE,
  payload: id,
});

const setCurrentExpense = (expense) => ({
  type: walletTypes.SET_CURRENT_EXPENSE,
  payload: expense,
});

const setEditMode = (value) => ({
  type: walletTypes.EDIT_MODE,
  payload: value,
});

const setCanValidate = () => ({
  type: walletTypes.CAN_VALIDATE,
});

export default {
  request,
  receive,
  failedRequest,
  addExpense,
  editExpenses,
  deleteExpense,
  setCurrentExpense,
  setEditMode,
  setCanValidate,
};
