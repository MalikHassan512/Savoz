// Auth Actions

import {
  GUEST_LOGIN_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGN_UP_REQUEST,
  RESET_PASSWORD_REQUEST,
  VALIDATE_RESET_TOKEN_REQUEST,
  NEW_PASSWORD_REQUEST,
  UPDATE_USER_DATA,
  CLEAR_USER_DATA,
} from '../types';

export const updateUser = payload => {
  return {type: UPDATE_USER_DATA, payload};
};

export const clearUserData = () => {
  return {type: CLEAR_USER_DATA};
};

export const loginRequest = (payload, onResponse) => {
  return {type: LOGIN_REQUEST, payload, onResponse};
};
export const guestLoginRequest = onResponse => {
  return {type: GUEST_LOGIN_REQUEST, onResponse};
};

export const signUpRequest = (payload, onResponse) => {
  return {type: SIGN_UP_REQUEST, payload, onResponse};
};

export const logoutRequest = (payload, onResponse) => {
  return {type: LOGOUT_REQUEST, payload, onResponse};
};

export const resetPasswordRequest = (payload, onResponse) => {
  return {type: RESET_PASSWORD_REQUEST, payload, onResponse};
};

export const validateResetToken = (payload, onResponse) => {
  return {type: VALIDATE_RESET_TOKEN_REQUEST, payload, onResponse};
};

export const newPasswordRequest = (payload, onResponse) => {
  return {type: NEW_PASSWORD_REQUEST, payload, onResponse};
};
