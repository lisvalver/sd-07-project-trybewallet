const initialState = {
  email: '',
};

export default function (state = initialState, action) {
  // console.log(action);
  switch (action.type) {
  case 'LOGIN':
    return {
      // ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
