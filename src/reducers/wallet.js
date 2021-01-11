// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CURRENCY':
    return { ...state, currencies: action.currency };
  default:
    return state;
  }
}
