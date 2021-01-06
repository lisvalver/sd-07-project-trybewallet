import userTypes from './types';

const signIn = (user) => ({
  type: userTypes.SIGNIN,
  payload: user,
});

export default signIn;
