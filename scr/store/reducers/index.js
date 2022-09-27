// Reducer

import {combineReducers} from 'redux';

import authReducer from './auth';
import productReducer from './product';
import profileReducer from './profile';
import cartReducer from './cart';

const appReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  profile: profileReducer,
  cart: cartReducer,
});

const reducer = (state, action) => {
  return appReducer(state, action);
};

export default reducer;
