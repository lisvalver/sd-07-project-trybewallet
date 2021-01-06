const initialState = {
  email: '',
  password: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case 'USER':
    return { ...state, email: action.payload.email, password: action.payload.password };
  default:
    return state;
  }
}
