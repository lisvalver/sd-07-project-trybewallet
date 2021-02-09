import * as actionTypes from './actionTypes';

const saveEmail = (email) => ({
  type: actionTypes.SAVE_EMAIL,
  email,
});

export default saveEmail;
