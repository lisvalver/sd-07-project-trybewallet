// Coloque aqui suas actions
export const USER = 'USER';

export const addUser = (data) => (
  {
    type: USER,
    data,
  }
);
