export const addUser = (user) => ({ type: 'ADD_USER', user });

export const addWalletCurrencies = (wallet) => ({
  type: 'ADD_WALLET_CURRENCIES',
  wallet,
});

export const addWalletExpenses = (wallet) => ({
  type: 'ADD_WALLET_EXPENSES',
  wallet,
});

export function fetchWalletExpenses() {
  return async (dispatch) => {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await resolve.json();
    return dispatch(addWalletCurrencies(json));
  };
}
