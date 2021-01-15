const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
  id: 0,
};

const NEW_EXPENSE = 'NEW_EXPENSE';
const GET_API = 'GET_API';

const getApiResult = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_API:
    return { ...state, currencies: action.value };

  case NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.value, id: state.id }],
      id: state.id + 1,
      totalExpense: +((state.totalExpense + action.value.value
        * action.value.exchangeRates[action.value.currency].ask).toFixed(2)),
    };
  default:
    return state;
  }
};

export default getApiResult;
