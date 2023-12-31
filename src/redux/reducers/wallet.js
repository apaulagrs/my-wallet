// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_NEW_EXPENSE,
  INIT_EDIT_EXPENSE,
  FINAL_EDIT_EXPENSE,
  DELETE_EXPENSE,
  REQUEST_DATA_WALLET,
  REQUEST_DATA_WALLET_SUCCESS,
  REQUEST_DATA_WALLET_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  toEdit: [],
  isLoading: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NEW_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.payload.wallet,
        exchangeRates: action.payload.currencies }] };
  case INIT_EDIT_EXPENSE:
    return { ...state,
      editor: true,
      toEdit: action.payload };
  case FINAL_EDIT_EXPENSE:
    return { ...state,
      editor: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.toEdit[0].id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      toEdit: [] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.id)] };
  case REQUEST_DATA_WALLET:
    return { ...state,
      isLoading: true };
  case REQUEST_DATA_WALLET_SUCCESS:
    return { ...state,
      isLoading: false,
      currencies: Object.keys(action.data).filter((e) => e !== 'USDT') };
  case REQUEST_DATA_WALLET_ERROR:
    return { ...state, isLoading: false, error: action.error };
  default:
    return state;
  }
};

export default walletReducer;
