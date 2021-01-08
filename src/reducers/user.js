const INITIAL_STATE = {
  email: '',
  logged: false,

};
function userReducer(state = INITIAL_STATE, action) {
  console.log('oi', action.type);
  switch (action.type) {
  case 'LOGIN': {
    console.log(state);
    return { email: action.email, logged: true };
  }

  default:
    return state;
  }
}

export default userReducer;
