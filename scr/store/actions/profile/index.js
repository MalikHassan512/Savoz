import {
  PROFILE_DELETE_REQUEST,
  PROFILE_UPDATE_REQUEST,
  UPDATE_PROFILE_DATA,
  SAVE_PAYMENT_METHOD_REQUEST,
  GET_USER_CARD_DATA_REQUEST,
  GET_USER_ADDRESSES_REQUEST,
  UPLOAD_PROFILE_PIC_REQUEST,
} from '../types';

export const getAllAddresses = onResponse => {
  return {type: GET_USER_ADDRESSES_REQUEST, onResponse};
};

export const uploadProfilePicRequest = (payload, onResponse) => {
  return {type: UPLOAD_PROFILE_PIC_REQUEST, payload, onResponse};
};

export const updateProfileRequest = (payload, onResponse) => {
  return {type: PROFILE_UPDATE_REQUEST, payload, onResponse};
};

export const updateProfile = payload => {
  return {type: UPDATE_PROFILE_DATA, payload};
};

export const deleteProfile = (payload, onResponse) => {
  return {type: PROFILE_DELETE_REQUEST, payload, onResponse};
};

export const savePaymentMethod = (payload, onResponse) => {
  return {type: SAVE_PAYMENT_METHOD_REQUEST, payload, onResponse};
};

export const getUserCards = () => {
  return {type: GET_USER_CARD_DATA_REQUEST};
};
