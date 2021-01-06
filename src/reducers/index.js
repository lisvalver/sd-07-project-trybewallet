import user from './user';
import wallet from './wallet';


const INICIAL_STATE = {
  user: {
    email: '',
  },
    wallet: {
      currencies: [],
      expenses: []
    }
}
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const reducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN_OK':
      return {
        user: {
        email: state.user.email + action.user.email,
      },
      wallet: {
        currencies: [...state.wallet.currencies, ...action.wallet.currencies],
        expenses: [...state.wallet.expenses, ...action.wallet.expenses]
      }
    }
    default:
      return state;
  }
}

export default reducer;
