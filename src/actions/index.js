// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';

const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export default saveEmail;

/* export const addPassword = () => ({
  type: 'ADD_PASSWORD',
  password,
});
 */
