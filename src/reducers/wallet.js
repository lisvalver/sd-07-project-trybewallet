// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  error: '',
  currencies: {},
  expenses: [],
  value: 0,
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case 'EXPENSER': {
    const idList = state.expenses.map(((objectExpenses) => objectExpenses.id));
    let foud = false;
    let idRadom;
    const milParaterNumDeTresDigitos = 1000;
    do {
      idRadom = Math.ceil(Math.random() * milParaterNumDeTresDigitos);
      if (!idList.includes(idRadom)) {
        foud = true;
      }
    } while (!foud);
    return { ...state,
      expenses:
      [...state.expenses,
        { ...action.payload,
          id: idRadom,
          exchangeRates: state.currencies }] };
  }
  case 'REQUIRE_CURRENCE_SUCESS':
    return { ...state, currencies: { ...action.payload } };
  case 'REQUIRE_FAIL':
    return { ...state, error: action.payload };
  case 'REQUIRE_CURRENCE_AND_VALUE':
    return { ...state, currenciesAndValue: [...action.payload] };
  case 'SUM': {
    const roundValue = () => {
      const valueTotal = state.expenses.reduce((acc, item) => {
        const itemCurrency = item.currency;
        if (itemCurrency === 'USD') {
          return (item.cash * item.exchangeRates.USDT.ask) + acc;
        }
        return (item.cash * item.exchangeRates[itemCurrency].ask) + acc;
      }, 0);
      const num = Math.round(valueTotal * 100);
      const numToFixed = (parseFloat(num).toFixed(2)) / 100;
      return numToFixed;
    };
    return { ...state, value: roundValue() };
  }
  default:
    return state;
  }
}
