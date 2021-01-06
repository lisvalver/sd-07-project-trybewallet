// Coloque aqui suas actions

const addUser = (email, password) => ({
  type: 'USER',
  payload: {
    email,
    password,
  },
});

export default addUser;
