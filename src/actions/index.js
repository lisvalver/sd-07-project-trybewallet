export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SEND_EMAIL = 'SEND_EMAIL';


export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});
