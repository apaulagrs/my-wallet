// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_DATA_WALLET,
  REQUEST_DATA_WALLET_SUCCESS,
  REQUEST_DATA_WALLET_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_DATA_WALLET:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_DATA_WALLET_SUCCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.data,
      expenses: [],
      editor: false,
      idToEdit: 0,
    };
  case REQUEST_DATA_WALLET_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default walletReducer;
