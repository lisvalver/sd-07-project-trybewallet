// Coloque aqui suas actions
const UPDATE_EMAIL = 'UPDATE_EMAIL';

export const email = (payload) => ({
  type: UPDATE_EMAIL,
  payload,
})

export const typesActions = {
  UPDATE_EMAIL: UPDATE_EMAIL,
}
