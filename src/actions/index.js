export const LOGIN_OK = 'LOGIN_OK';

export const currentLogin = (user) => ({
  type: 'LOGIN_OK',
  user,
});
