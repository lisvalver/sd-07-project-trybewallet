import api from '../service/api';

export const login = (email) => ({ type: 'LOGIN', value: email });

export const apiAction = () => async (dispatch) => {
  const apiResult = await api();
  return dispatch({ type: 'GET_API', value: apiResult });
};
