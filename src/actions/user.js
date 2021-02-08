import * as actionTypes from './actionTypes';

export const saveEmail = (email) => ({
  type: actionTypes.SAVE_EMAIL,
  email,
});
