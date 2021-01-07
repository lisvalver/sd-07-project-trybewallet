const login = (email, password) => ({
  type: 'USER',
  payload: {
    email,
    password,
  },
});

export default login;
