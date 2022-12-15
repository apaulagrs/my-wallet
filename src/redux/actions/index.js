// Coloque aqui suas actions
export const USER = 'USER';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const REQUEST_DATA_WALLET = 'REQUEST_DATA_WALLET';
export const REQUEST_DATA_WALLET_SUCCESS = 'REQUEST_DATA_WALLET_SUCCESS';
export const REQUEST_DATA_WALLET_ERROR = 'REQUEST_DATA_WALLET_ERROR';

export const userRequest = (email) => ({
  type: USER,
  email,
});

export const newExpense = (wallet, currencies) => ({
  type: ADD_NEW_EXPENSE,
  payload: {
    wallet,
    currencies,
  },
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

const requestDataWallet = () => ({
  type: REQUEST_DATA_WALLET,
});

const responseDataWalletSuccess = (data) => ({
  type: REQUEST_DATA_WALLET_SUCCESS,
  data,
});

const responseDataWalletError = (error) => ({
  type: REQUEST_DATA_WALLET_ERROR,
  error,
});

export const fetchWalletReducer = () => async (dispatch) => {
  dispatch(requestDataWallet());

  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    /*  const finalData = Object.keys(data).filter((e) => e !== 'USDT'); */
    dispatch(responseDataWalletSuccess(data));
  } catch (error) {
    dispatch(responseDataWalletError(error));
  }
};
