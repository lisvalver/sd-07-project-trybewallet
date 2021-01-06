// Coloque aqui suas actions
import { LOGIN } from '../reducers/user';

const loginAction = (email) => ({ type: LOGIN, email });

export default loginAction;
