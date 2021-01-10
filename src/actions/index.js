// Coloque aqui suas actions
const addUser = (email, password) => ({
  type: 'USER',
  data: {
    email,
    password,
  },
});

export { addUser };
