const INITIAL_STATE = {
  email: '123456@email.com',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
