// Coloque aqui suas actions

export const EMAIL = 'EMAIL';

export const sendEmail = (email) => ({
  type: EMAIL,
  email,
});
