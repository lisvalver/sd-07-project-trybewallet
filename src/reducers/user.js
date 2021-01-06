// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = { email: '' };
const reducerAddTask = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_TASK':
    return [...state, action.payload];
  case 'REMOVE_TASK':
    return state.filter((item, index) => index !== action.payload);
  default:
    return state;
  }
};

export default reducerAddTask;
