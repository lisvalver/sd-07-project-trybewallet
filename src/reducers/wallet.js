const INITIAL_STATE = { currencies: [], expenses: [] };
const ADD_EXPENSE = 'ADD_EXPENSE';
const DEL_EXPENSE = 'DEL_EXPENSE';

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { currencies: [], expenses: [...state.expenses, action.value] };
  case DEL_EXPENSE:
    return { currencies: [],
      expenses: [...state.expenses.filter((expen) => (expen.id !== action.value))] };
  default:
    return state;
  }
};

export default walletReducer;
