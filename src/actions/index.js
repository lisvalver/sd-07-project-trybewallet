// Coloque aqui suas actions

const CHANGE_USER = 'CHANGE_USER';

function changeUser(value) {
  return {
    type: CHANGE_USER,
    value,
  };
}

export default changeUser;
