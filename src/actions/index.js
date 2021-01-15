import types from './types';

const userEmail = (email) => ({
  type: types.USER_INFORMATION,
  email,
});

export default userEmail;
