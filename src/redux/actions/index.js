import apiTokenFetch from '../apiRequest/fetchApi';

export const SAVE_USER = 'SAVE_USER';
export const REQUEST_FETCH_API = 'REQUEST_FETCH_API';
export const RECEIVED_RESPONSE_API = 'RECEIVED_RESPONSE_API';

export const savePlayer = (name, email) => (
  {
    type: SAVE_USER,
    name,
    email,
  }
);

export const requestApi = () => ({
  type: REQUEST_FETCH_API,
  isfetching: false,
});

export const responseApi = (response) => ({
  type: RECEIVED_RESPONSE_API,
  token: response,
});

export function gettingTokenThunk() {
  return async (dispatch) => {
    dispatch(requestApi());

    const response = await apiTokenFetch();
    dispatch(responseApi(response));
  };
}
