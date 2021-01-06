// Coloque aqui suas actions
import CLICK_UPDATE_EMAIL_VALUE from './actionTypes';

const loginButton = (value) => ({
  type: CLICK_UPDATE_EMAIL_VALUE,
  newValue: value,
});

export default loginButton;
