const INICIAL_STATE = {
  email: '',
};

const userReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_OK':
    return {
      email: action.user,
    };
  default:
    return state;
  }
};

export default userReducer;
