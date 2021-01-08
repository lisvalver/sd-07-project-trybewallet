// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const USER_WALLET_CURRENCIES = 'USER_WALLET_CURRENCIES';
export const USER_WALLET_EXPENSES = 'USER_WALLET_EXPENSES';

const emailUser = (email) => ({
  type: USER_EMAIL,
  email,
});

export const walletCurrencies = (currencies) => ({
  type: USER_WALLET_CURRENCIES,
  currencies,
});

export const walletExpenses = (expenses) => ({
  type: USER_WALLET_EXPENSES,
  expenses,
});

export default emailUser;
