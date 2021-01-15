// Coloque aqui suas actions
export const addWalletCurrencies = (wallet) => ({
  type: 'ADD_WALLET_CURRENCIES',
  wallet,
});
export const addWalletExpenses = (wallet) => ({
  type: 'ADD_WALLET_EXPENSES',
  wallet,
});

export const updateExpenses = (expenses) => ({
  type: 'UPDATE_EXPENSES',
  expenses,
});

export function fetchWalletExpenses() {
  return async (dispatch) => {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await resolve.json();
    return dispatch(addWalletCurrencies(json));
  };
}
