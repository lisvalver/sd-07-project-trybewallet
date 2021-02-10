import { React, useReducer } from 'react';
import TrybeWallet from './TrybeWallet';
import { user } from '../reducers';

// children vai pegar o 'filho' do provider

// {
//     user: {
//       email: '',
//     },
//     wallet: {
//       currencies: [],
//       expenses: []
//     }
//   }
const initialState = { user: { email: '' } };
export default function Provider({ children }) {
  const [userData, setUser] = useReducer(user, initialState);
  const values = {
    userData,
    setUser,
  };

  return (
    <TrybeWallet.Provider values={ values }>
      {children}
    </TrybeWallet.Provider>
  );
}
