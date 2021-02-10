const SAVE_EMAIL = 'SAVE_EMAIL';

const salveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export { salveEmail, SAVE_EMAIL };
