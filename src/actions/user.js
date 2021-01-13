export const USER_EMAIL = 'USER_EMAIL';

const emailUser = (email) => ({
  type: USER_EMAIL,
  email,
});

export default emailUser;
