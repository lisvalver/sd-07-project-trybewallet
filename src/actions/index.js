// Coloque aqui suas actions
import CLICK_UPDATE_EMAIL_VALUE from './actionTypes';

const loginButton = (email) => ({
  type: CLICK_UPDATE_EMAIL_VALUE,
  payload: email,
});

export default loginButton;
