import {
  CATEGORY_LISTING_REQUEST,
  PRODUCT_LISTING_REQUEST,
  PRODUCT_LISTING_BY_STORE_ID_REQUEST,
  ADD_FAVOURITE_REQUEST,
  GET_FAVOURITE_REQUEST,
  REMOVE_FROM_FAVOURITE_REQUEST,
  CLEAR_FAVOURITES_DATA,
} from '../types';

export const categoryListingRequest = (payload, onResponse) => {
  return {type: CATEGORY_LISTING_REQUEST, payload, onResponse};
};

export const productListingRequest = (payload, onResponse) => {
  return {type: PRODUCT_LISTING_REQUEST, payload, onResponse};
};
export const getFavouriteList = () => {
  return {type: GET_FAVOURITE_REQUEST};
};

export const addProductToFavourite = (payload, extras, onResponse) => {
  return {type: ADD_FAVOURITE_REQUEST, payload, extras, onResponse};
};
export const removeProductFromFavourite = (payload, onResponse) => {
  return {type: REMOVE_FROM_FAVOURITE_REQUEST, payload, onResponse};
};

export const clearFavouriteData = () => {
  return {type: CLEAR_FAVOURITES_DATA};
};
