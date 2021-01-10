export const DATE_VALID = 'DATE_VALID';
export const DATE_INVALID = 'DATE_INVALID';

const invalidDates = () => ({
  type: DATE_INVALID,
});

const validDates = () => ({
  type: DATE_VALID,
});

const valideDates = (email, password) => {
  const emailValidate = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const passwordMinLength = 6;
  const validPassword = password.length >= passwordMinLength;
  const validEmail = emailValidate.test(email);
  return (validPassword && validEmail);
};

export default function validator(email, password) {
  return (dispatch) => {
    dispatch(invalidDates());
    if (valideDates(email, password)) {
      dispatch(validDates());
    } else {
      dispatch(invalidDates());
    }
  };
}
