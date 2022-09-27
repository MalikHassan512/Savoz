import {
  ADD_PRODUCT_TO_CART,
  UPDATE_PRODUCT_QTY,
  REMOVE_PRODUCT_TO_CART,
  UPDATE_DATA_FROM_LOCAL_STORAGE,
  PLACE_ORDER_REQUEST,
  UPDATE_ORDER_TYPE,
  GET_ALL_ORDERS_REQUEST,
  GET_APP_SETTINGS_REQUEST,
} from '../types';

export const getAppSettings = () => {
  return {type: GET_APP_SETTINGS_REQUEST};
};

export const getAllOrders = (payload, onResponse) => {
  return {type: GET_ALL_ORDERS_REQUEST, payload, onResponse};
};

export const updateOrderType = payload => {
  return {type: UPDATE_ORDER_TYPE, payload};
};

export const addProductToCart = payload => {
  return {type: ADD_PRODUCT_TO_CART, payload};
};

export const removeProductToCart = payload => {
  return {type: REMOVE_PRODUCT_TO_CART, payload};
};
export const updateProductQty = payload => {
  return {type: UPDATE_PRODUCT_QTY, payload};
};
export const updateCartWithLocalData = payload => {
  return {type: UPDATE_DATA_FROM_LOCAL_STORAGE, payload};
};

export const placeOrderRequest = (payload, onResponse) => {
  return {type: PLACE_ORDER_REQUEST, payload, onResponse};
};
