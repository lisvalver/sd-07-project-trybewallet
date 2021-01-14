const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
};

// const NEW_EXPENSE = 'NEW_EXPENSE';
const GET_API = 'GET_API';

const getApiResult = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_API:
    return { ...state, currencies: action.value };
  default:
    return state;
  }
};

// function wallet(state = INITIAL_STATE, action) {
//   const currentId = state.expenses.length;

//   switch (action.type) {
//   case CURRENCIES:
//     return {
//       ...state,
//       currencies: action.value,
//     };

//   case NEW_EXPENSE:
//     const { inputValues, apiResult, expense } = action.value;
//     const totalExpense = expense + state.totalExpense;
//     const {
//       valueInput,
//       descriptionInput,
//       currencyInput,
//       methodInput,
//       tagInput,
//     } = inputValues;
//     return {
//       ...state,
//       expenses: [
//         ...state.expenses,
//         {
//           id: currentId,
//           value: valueInput,
//           currency: currencyInput,
//           method: methodInput,
//           tag: tagInput,
//           description: descriptionInput,
//           exchangeRates: apiResult,
//         }
//       ],
//       totalExpense,
//     };
//   default:
//     return state;
//   };
// }

export default getApiResult;
