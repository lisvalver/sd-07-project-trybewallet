import * as actionTypes from './actionTypes';

export const saveEmail = (email) => {
  return {
    type: actionTypes.SAVE_EMAIL,
    email: email,
  };
}
