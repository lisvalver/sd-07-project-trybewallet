const INITIAL_STATE = {
  // wallet: {
  currencies: [],
  expenses: [],
  totalValue: 0,
  // },
};
const ADD_EXPENSE = 'ADD_EXPENSE';
const DEL_EXPENSE = 'DEL_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const TOTAL_EXPENSE = 'TOTAL_EXPENSE';

const editFunc = (state, { value }) => {
  const arrayIndex = state.wallet.expenses.map((element, index) => {
    if (element.id === value.id) return index;
    return element.id === value.id;
  });
  const indexElement = arrayIndex.filter((element) => typeof element === ('number'));
  delete value.expenseNumber;
  delete value.totalValue;
  delete value.editState;
  const newObject = Object.assign(state.wallet.expenses[indexElement], value);
  const newState = Object.assign(state.wallet.expenses, newObject);
  return newState;
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.value] };
  case TOTAL_EXPENSE:
    return { ...state,
      totalValue: state.expenses.reduce((acc, { exchangeRates, currency, value }) => {
        const total = parseFloat(value * exchangeRates[currency].ask);
        return acc + total;
      }, 0) };
  case DEL_EXPENSE:
    return { wallet: { currencies: [],
      expenses: [...state.expenses.filter((expen) => (expen.id !== action.value))] } };
  case EDIT_EXPENSE:
    return { currencies: [],
      expenses: [...editFunc(state, action)] };
  default:
    return state;
  }
};

export default wallet;
