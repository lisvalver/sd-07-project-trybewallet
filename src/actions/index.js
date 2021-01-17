import types from './types';
import getCurrency from '../services/awesomeApi';

export const userEmail = (email) => ({
  type: types.USER_INFORMATION,
  email,
});

export const userCurrencie = (currencie) => ({
  type: types.USER_CURRENCIES,
  currencie: Object.keys(currencie)
    .filter((curre) => curre !== 'USDT'),
});

export const userExpencies = (expenses, currencie) => ({
  type: types.USER_EXPENCIES,
  expenses,
  currencie,
});

export const userValue = (sumValue) => ({
  type: types.USER_VALUE,
  sumValue,
});

export const userRemove = (id) => ({
  type: types.USER_REMOVE,
  id,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const currencyApi = await getCurrency();
    dispatch(userCurrencie(currencyApi));
  };
}

export function fetchUserCurrency(expenses) {
  return async (dispatch) => {
    const currencyApi = await getCurrency();
    dispatch(userExpencies(expenses, currencyApi));
  };
}
