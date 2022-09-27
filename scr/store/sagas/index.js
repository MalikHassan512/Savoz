import {all, fork} from 'redux-saga/effects';
import {
  signUp,
  login,
  logout,
  resetPassword,
  validateResetToken,
  newPassword,
  gustLogin,
} from './auth';
import {
  getCategoryList,
  getProductList,
  getFavouriteList,
  addToFavourite,
  removeFromFavourite,
} from './product';

import {placeOrder, getAllOrder, getAppSettings} from './cart';

import {
  updateProfile,
  savePaymentMethod,
  deleteProfile,
  getUserCardData,
  getOrderAddress,
  uploadProfilePic,
} from './profile';

export default function* saga() {
  yield all([
    fork(gustLogin),
    fork(login),
    fork(signUp),
    fork(logout),
    fork(resetPassword),
    fork(validateResetToken),
    fork(newPassword),
    fork(getCategoryList),
    fork(getProductList),
    fork(updateProfile),
    fork(placeOrder),
    fork(savePaymentMethod),
    fork(deleteProfile),
    fork(getUserCardData),
    fork(getAllOrder),
    fork(getOrderAddress),
    fork(uploadProfilePic),
    fork(getFavouriteList),
    fork(addToFavourite),
    fork(removeFromFavourite),
    fork(getAppSettings),
  ]);
}
