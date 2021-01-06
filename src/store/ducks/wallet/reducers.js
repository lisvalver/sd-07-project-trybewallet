import walletTypes, {
  RESETED_EXPENSE,
  RESETED_VALIDATE_EXPENSE,
  RESETED_VALIDATE_EXPENSE_ALL_VALID,
} from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.wallet;

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case walletTypes.REQUEST:
    return { ...state, isFetching: true };
  case walletTypes.RECEIVE: {
    delete action.payload.USDT;
    return {
      ...state,
      currencies: Object.keys(action.payload).sort(),
      lastExchangeRates: action.payload,
      isFetching: false,
    };
  }
  case walletTypes.FAILED_REQUEST:
    return { ...state, error: action.payload, isFetching: false };
  case walletTypes.ADD: {
    const newExpense = { ...state.currentExpense };
    newExpense.id = state.nextId;
    newExpense.exchangeRates = { ...state.lastExchangeRates };
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      nextId: state.nextId + 1,
      total: state.total
        + (parseFloat(newExpense.value)
        * parseFloat(state.lastExchangeRates[newExpense.currency].ask)),
      currentExpense: { ...RESETED_EXPENSE },
      validateExpense: JSON.parse(JSON.stringify(RESETED_VALIDATE_EXPENSE)),
      canValidate: false,
    };
  }
  case walletTypes.DELETE: {
    const deletedExpense = state.expenses
      .find(({ id }) => id === action.payload);
    const newExpenses = [...state.expenses];
    newExpenses.splice(newExpenses.indexOf(deletedExpense), 1);
    return {
      ...state,
      expenses: newExpenses,
      total: state.total
        - (parseFloat(deletedExpense.value)
        * parseFloat(deletedExpense.exchangeRates[deletedExpense.currency].ask)),
    };
  }
  case walletTypes.EDIT: {
    const previousExpense = state.expenses
      .find(({ id }) => id === state.currentExpense.id);
    const newExpenses = [...state.expenses];
    newExpenses[newExpenses.indexOf(previousExpense)] = { ...state.currentExpense };
    const previousValue = parseFloat(previousExpense.value)
      * parseFloat(previousExpense.exchangeRates[previousExpense.currency].ask);
    const newValue = parseFloat(state.currentExpense.value)
      * parseFloat(state.currentExpense.exchangeRates[state.currentExpense.currency].ask);
    return {
      ...state,
      expenses: newExpenses,
      total: state.total - previousValue + newValue,
      currentExpense: { ...RESETED_EXPENSE },
      validateExpense: { ...RESETED_VALIDATE_EXPENSE },
      editMode: false,
      canValidate: false,
    };
  }
  case walletTypes.EDIT_MODE:
    if (action.payload) {
      return {
        ...state,
        editMode: true,
        validateExpense: { ...RESETED_VALIDATE_EXPENSE_ALL_VALID },
        canValidate: false,
      };
    }
    return {
      ...state,
      editMode: false,
      currentExpense: { ...RESETED_EXPENSE },
      validateExpense: { ...RESETED_VALIDATE_EXPENSE },
      canValidate: false,
    };
  case walletTypes.SET_CURRENT_EXPENSE: {
    const newValidateExpense = { ...state.validateExpense };
    const [key, value] = Object.entries(action.payload)[0];
    if (key !== 'id') {
      if (key !== 'value') {
        newValidateExpense[key].status = value !== '';
      } else {
        newValidateExpense[key].status = parseFloat(value) > 0;
      }
    }
    return {
      ...state,
      currentExpense: { ...state.currentExpense, ...action.payload },
      validateExpense: newValidateExpense,
    };
  }
  case walletTypes.CAN_VALIDATE:
    return {
      ...state,
      canValidate: true,
    };
  default:
    return state;
  }
};

export default wallet;
