// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const newExpense = (state = {}, action = {}) => {
  const { expenses } = action;
  const myExpense = { id: state.expenses.length, ...expenses };
  return state.expenses.push(myExpense);
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CURRENCY':
    return { ...state, currencies: action.currency };
  case 'ADD_EXPENSE':
    return newExpense(state, action);
  default:
    return state;
  }
}
