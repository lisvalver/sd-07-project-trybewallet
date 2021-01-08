import userTypes from './types';

export const saveEmail = (email) => ({
  type: userTypes.LOGIN,
  email,
});

export const test = (testing) => (
  console.log(testing)
);
