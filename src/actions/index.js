export const LOGIN = 'LOGIN';
export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const TOTAL = 'TOTAL';
export const UPDATE = 'UPDATE';
export const EDIT = 'EDIT';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const requestSuccess = (payload) => ({
  type: REQUEST_SUCESS,
  payload,
});
export const requestFailed = (error) => ({
  type: REQUEST_SUCESS,
  payload: error,
});

export const add = (payload) => ({
  type: ADD,
  payload,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});

export const total = () => ({
  type: TOTAL,
});

export const edit = (id = null) => ({
  type: EDIT,
  id,
});

export const update = (payload) => ({
  type: UPDATE,
  payload,
});

export const fetchApi = () => async (dispatch) => {
  try {
    const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await endpoint.json();
    dispatch(requestSuccess(response));
  } catch (error) {
    const { message } = error;
    dispatch(requestFailed(message));
  }
};

/* https://github.com/tryber/sd-07-project-trybewallet/pull/136
https://github.com/tryber/sd-07-project-trybewallet/pull/135/files
https://github.com/tryber/sd-07-project-trybewallet/pull/126/files
plantão do zambeli + origamid Redux Toolkit */
