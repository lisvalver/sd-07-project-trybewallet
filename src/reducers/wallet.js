// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  expenses: [] };

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case 'EXPENSER':
    return { ...state, expenses: [...state.expenses, { ...action.payload }] };
  default:
    return state;
  }
}
