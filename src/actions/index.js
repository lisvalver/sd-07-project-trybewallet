// Coloque aqui suas actions
import fetchAPI from '../helper';

export const LOGIN = 'LOGIN';
export const FETCHING = 'FETCHING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const login = (email) => ({ type: LOGIN, email });

export const fetching = () => ({ type: FETCHING });
export const fetchSuccess = (data) => ({ type: FETCH_SUCCESS, data });

export const fetchData = () => (
  async (dispatch) => {
    dispatch(fetching());
      const data = await fetchAPI();

      delete data.USDT;
      dispatch(fetchSuccess(data));
  }
);
