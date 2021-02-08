import types from './types';

export const saveLogin = (email) => (
  {
    type: types.SAVE_LOGIN,
    email,
  }
);

export default saveLogin;
