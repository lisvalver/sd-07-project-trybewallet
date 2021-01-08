// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  isFetch: false,
  error: '',
  currencies: [],
  expenses: [],
  currenciesAndValue: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case 'EXPENSER':
    return { ...state, expenses: [...state.expenses, { ...action.payload }] };
  case 'REQUIRE_CURRENCE':
    return { ...state, isFetch: true };
  case 'REQUIRE_CURRENCE_SUCESS':
    return { ...state, isFetch: false, currencies: [...action.payload] };
  case 'REQUIRE_FAIL':
    return { ...state, isFetch: false, error: action.payload };
  case 'REQUIRE_CURRENCE_AND_VALUE':
    return { ...state, currenciesAndValue: [...action.payload] };
  default:
    return state;
  }
}
