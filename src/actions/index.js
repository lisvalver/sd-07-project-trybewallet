// Coloque aqui suas actions

const addUser = (email) => ({
  type: 'USER',
  payload: {
    email,
    password,
  },
});

export default addUser;
