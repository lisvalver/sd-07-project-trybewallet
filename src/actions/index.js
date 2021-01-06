// Coloque aqui suas actions
import { LOGIN_USER } from '../constants';

const loginAction = {
  addUser: (user) => ({
    type: LOGIN_USER,
    payload: user,
  }),
};

const walletAction = {
  anything: (any) => ({
    type: 'SOMETHING',
    payload: any,
  }),
};

export { loginAction, walletAction };
