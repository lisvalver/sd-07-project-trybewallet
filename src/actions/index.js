export const USER_EMAIL = 'USER_EMAIL';

export const emailUser = (email) => ({
  type: USER_EMAIL,
  email,
});
