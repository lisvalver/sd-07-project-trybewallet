// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
const ADD_TODO = 'ADD_TODO';
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_TODO:
    return state;
  default:
    return state;
  }
}
export default wallet;
