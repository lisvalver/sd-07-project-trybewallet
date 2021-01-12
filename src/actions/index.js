export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const NEW_EXPENSE = 'NEW_EXPENSE';

export const emailLogin = (email) => (
  {
    type: EMAIL_LOGIN,
    email,
  }
);

export const newExpense = (expense) => (
  {
    type: NEW_EXPENSE,
    expense,
  }
);
