// Coloque aqui suas actions
export const addUser = (email, password) => ({
  type: 'USER',
  data: {
    email,
    password,
  },
});
