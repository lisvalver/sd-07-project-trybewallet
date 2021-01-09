// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  error: '',
  currencies: {},
  expenses: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case 'EXPENSER':
    const idList = state.expenses.map((objectExpenses => objectExpenses.id));
    let foud = false;
    let idRadom;
    do {
      idRadom = Math.ceil(Math.random()*1000);
      if (!idList.includes(idRadom)) {
        foud = true;
      }
    } while (!foud);
    return { ...state,
      expenses: [...state.expenses, { ...action.payload, id:idRadom, exchangeRates: state.currencies }] };
  case 'REQUIRE_CURRENCE_SUCESS':
    return { ...state, currencies: {...action.payload} };
  case 'REQUIRE_FAIL':
    return { ...state, error: action.payload };
  case 'REQUIRE_CURRENCE_AND_VALUE':
    return { ...state, currenciesAndValue: [...action.payload] };
  default:
    return state;
  }
}
