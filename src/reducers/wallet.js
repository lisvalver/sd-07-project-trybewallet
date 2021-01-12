// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CURRENCY':
    return { ...state, currencies: action.currency };
  case 'ADD_EXPENSE':
    console.log(action.expense);
    return {
      ...state,
      id: state.lenght,
      expenses: [...state.expenses, { ...action.payload, id: state.id }],
    };
  default:
    return state;
  }
}
