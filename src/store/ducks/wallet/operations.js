import currencyAPI from '../../../services/currencyAPI';
import actions from './actions';

export default function fetchCurrency() {
  return (dispatch) => {
    dispatch(actions.request());
    return currencyAPI()
      .then((result) => dispatch(actions.receive(result)))
      .catch((error) => dispatch(actions.failedRequest(error)));
  };
}
