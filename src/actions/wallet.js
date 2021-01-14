import api from '../service/api';

/*
export function wallet(inputValues) {
  return async (dispatch) => {
    const apiResult = await api();
    const { valueInput, currencyInput } = inputValues;
    let quotation = apiResult[currencyInput];
    quotation = quotation.ask;
    const expense = valueInput * quotation;
    return dispatch({ type: 'NEW_EXPENSE', value: { inputValues, apiResult, expense } });
  };
}
*/

export function apiAction() {
  return async (dispatch) => {
    const apiResult = await api();
    return dispatch({ type: 'CURRENCIES', value: apiResult })
  }
}

export function newExpese(input)

