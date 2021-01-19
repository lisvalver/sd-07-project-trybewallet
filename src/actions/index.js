export const LOGIN = 'LOGIN';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const ADDTOTAL = 'ADDTOTAL';

export const addTotal = (total) => ({
  type: ADDTOTAL,
  total,
});
