import {Platform} from 'react-native';
import {height, width, IS_IPHONE_X, IS_IPHONE} from './Dimensions';
import Colors from './Colors';
import Fonts from './Fonts';

const Constants = {
  CONTACT_SUPPORT: 'support@savoz.me',
  PRIVACY_POLICY: 'https://www.savoz.me/privacy-policy',
  TERMS_CONDITIONS: 'https://www.savoz.me/terms-and-conditions',
  GUEST_USER: 5,
  USER_DATA: 'UserData',
  CART_DATA: 'cart_data',
  AUTH_TOKENS: 'auth_tokens',
  USER_ROLE_ID: 1,
  EMPLOYEE_ROLE_ID: 2,
  ADD: 'add',
  REMOVE: 'remove',
  PICKUP: 'pickup',
  DELIVERY: 'door',
  CONST_CAMERA_OPTIONS: {
    width: 300,
    height: 400,
    cropping: true,
  },
  CONST_KEYBOARD_VERTICAL_OFFSET: Platform.OS === 'ios' ? 0 : -300,
};

export {height, width, Colors, IS_IPHONE_X, Constants, Fonts, IS_IPHONE};
