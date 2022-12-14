// Coloque aqui suas actions
export const USER = 'USER';
export const REQUEST_DATA_WALLET = 'REQUEST_DATA_WALLET';
export const REQUEST_DATA_WALLET_SUCCESS = 'REQUEST_DATA_WALLET_SUCCESS';
export const REQUEST_DATA_WALLET_ERROR = 'REQUEST_DATA_WALLET_ERROR';

export const userRequest = (email) => ({
  type: USER,
  email,
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
    const finalData = Object.keys(data).filter((e) => e !== 'USDT');
    dispatch(responseDataWalletSuccess(finalData));
  } catch (error) {
    dispatch(responseDataWalletError(error));
  }
};
