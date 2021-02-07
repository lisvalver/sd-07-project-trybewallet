// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES } from '../actions'
import { ADD_EXPENSES } from '../actions'

// import { GET_ALL_OBJECTS } from '../actions'

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const userWallet = (state = INITIAL_STATE, action) => {
  // const newExpense = [...state.expenses];
  switch (action.type) {
    case GET_CURRENCIES:
      return  {...state, currencies: action.currenciesAPI }
    case ADD_EXPENSES:
      return {...state, 
        expenses: [ ...state.expenses, action.value ],
        total: (state.total+action.parcial)
      }
  default:
    return state;
  }
};



export default userWallet;
// o export default é o principal, é oq é chamado quando tem o import
