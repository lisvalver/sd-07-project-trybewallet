import api from '../service/api';

function wallet(inputValues) {
  return async (dispatch) => {
    const apiResult = await api();
    const { valueInput, currencyInput } = inputValues;
    let quotation = apiResult[currencyInput];
    quotation = quotation.ask;
    const expense = valueInput * quotation;
    return dispatch({ type: 'NEW_EXPENSE', value: { inputValues, apiResult, expense } });
  }
}

export default wallet;
