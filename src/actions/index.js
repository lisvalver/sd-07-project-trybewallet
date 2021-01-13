export const EMAIL = 'EMAIL';
export const WALLET = 'WALLET';

export function clientAction(email) {
  return {
    type: EMAIL,
    email,
  };
}

export function walletAction(currencies, expenses) {
  return {
    type: WALLET,
    currencies,
    expenses,
  };
}
