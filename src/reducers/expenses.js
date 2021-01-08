const initialState = {
  value: 0,
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case 'SUM':
    return { ...state, value: action.payload };
  default:
    return state;
  }
}
