import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  product: productReducer,
  cart: cartReducer
});
