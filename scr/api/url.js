// API endpoints

import Env from './env';

const makeURL = (url, version = Env.version) => {
  return `${Env.baseURL}/v${version}/${url}`;
  // return `${Env.baseURL}/v${version}/${url}?x-api-key=${Env.apiKey}`;
};
const url = {
  guestLogin: makeURL('auth/guest_login'),
  login: makeURL('auth/login'),
  logout: makeURL('logout'),
  signUp: makeURL('auth/signup'),
  resetPassword: makeURL('auth/reset_password'),
  validateResetToken: makeURL('auth/validate_reset_token'),
  newPassword: makeURL('auth/new_password'),
  categoryListing: makeURL('category/sub_category_listing'),
  productListing: makeURL('product/product_listing'),
  profileUpdate: makeURL('profile/update'),
  profilePicUpload: makeURL('profile/upload_file'),
  _profilePicUpload: makeURL('profile/upload_profile'),
  profileDelete: makeURL('profile/delete'),
  savePaymentMethod: makeURL('auth/save_card'),
  placeOrder: makeURL('order/order_place'),
  getFavourite: makeURL('product/favourite'),
  addToFavourite: makeURL('product/favourite'),
  removeFromFavourite: makeURL('product/favourite'),
  cardsData: makeURL('auth/cards_data'),
  getAddresses: makeURL('order/order_addresses'),
  getAllOrders: makeURL('order/all_orders'),
  getAppSettings: makeURL('auth/settings'),
};

export default url;
