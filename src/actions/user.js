import * as actionTypes from './actionTypes';

export default saveEmail = (email) => ({
  type: actionTypes.SAVE_EMAIL,
  email,
});
