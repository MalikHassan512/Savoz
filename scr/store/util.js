import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constants} from '../constants';
import {LayoutProvider} from 'recyclerlistview';
import {ViewTypes} from '../constants/enums';
import {Dimensions, Linking} from 'react-native';
import {widthPercentageToDP as wp} from '../constants/Utils';

const {width} = Dimensions.get('window');

export const stripePublishableKey = 'pk_test_SVZChObFXbndY04iLpFokrCD';
export const stripeSecretKey = 'sk_test_sjCe6q8R8cmVVN7l2bLeVkkT';

export const googleMapAPIKey = 'AIzaSyBTfypSbx_zNMhWSBXMTA2BJBMQO7_9_T8';

export const saveUserData = data => {
  console.log('data is: ', data);

  {
    data?.user &&
      AsyncStorage.setItem(Constants.USER_DATA, JSON.stringify(data.user))
        .then(() => {
          console.log('user data stored in Async successfully');
        })
        .catch(e =>
          console.log('Got error while storing user data to Async', e),
        );
  }
  {
    data?.tokens &&
      AsyncStorage.setItem(Constants.AUTH_TOKENS, JSON.stringify(data.tokens))
        .then(() => {
          console.log('user tokens stored in Async successfully');
        })
        .catch(e =>
          console.log('Got error while storing user Token to Async', e),
        );
  }
};

export const clearUserData = () => {
  AsyncStorage.removeItem(Constants.USER_DATA).catch(e => console.log(e));
  AsyncStorage.removeItem(Constants.AUTH_TOKENS).catch(e => console.log(e));
  AsyncStorage.removeItem(Constants.CART_DATA).catch(e => console.log(e));
};

export const openLinkInBrowser = url => {
  console.log('url is: ', url);
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url).catch(e =>
        console.log('Error in opening url in browser: ', e),
      );
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};

export const calculateTotalTax = arr => {
  let tax = 0;
  arr.forEach(item => {
    if (item?.productIsTaxable) {
      if (item?.productTaxPercentage != null) {
        tax =
          tax +
          (item.productTaxPercentage / 100) *
            item.productUnitPrice *
            item.purchaseQty;
      }
    }
  });
  console.log('total tax is: ', tax);
  return tax;
};

export const calculateTotalDiscount = arr => {
  let discount = 0;
  arr.forEach(item => {
    if (item?.productDiscountActive) {
      if (item?.productDiscountAvailable != 0) {
        discount =
          discount +
          (item.productDiscountAvailable / 100) *
            item.productUnitPrice *
            item.purchaseQty;
      }
    }
  });
  console.log('total discount is: ', discount);
  return discount;
};

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validatePassword = pass => {
  if (pass.length < 8) {
    return false;
  } else {
    return true;
  }

  // Minimum eight characters, at least one letter and one number:
  // return String(pass)
  //   .toLowerCase()
  //   .match('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$');
};

export const parseError = error => {
  let message = '';
  // console.log('error: ', error)
  if (error.response) {
    // console.log('error response: ', error.response)
    message = error.response.data.message;
  } else if (error.request) {
    message = 'Network Error!';
  } else {
    message = error.message;
  }

  console.log('error msg: ', message);

  if (message === undefined) {
    message = 'Service Unavailable';
  }
  return message;
};

export const layoutProvider = new LayoutProvider(
  i => {
    let index = i;
    do {
      if (index > 9) {
        index = index - 10;
      }
    } while (index > 9);

    if (index === 0) {
      return ViewTypes.HALF_LEFT;
    } else if (index === 1) {
      return ViewTypes.HALF_RIGHT;
    } else if (index === 2) {
      return ViewTypes.MORE_LEFT;
    } else if (index === 3) {
      return ViewTypes.LESS_RIGHT;
    } else if (index === 4) {
      return ViewTypes.LESS_EQUAL;
    } else if (index === 5) {
      return ViewTypes.LESS_EQUAL;
    } else if (index === 6) {
      return ViewTypes.LESS_EQUAL;
    } else if (index === 7) {
      return ViewTypes.FULL;
    } else if (index === 8) {
      return ViewTypes.LESS_LEFT;
    } else if (index === 9) {
      return ViewTypes.MORE_RIGHT;
    } else {
      return ViewTypes.FULL;
    }
  },
  (type, dim) => {
    switch (type) {
      case ViewTypes.HALF_LEFT:
        dim.width = wp('49.5%');
        dim.height = 180;
        break;
      case ViewTypes.HALF_RIGHT:
        dim.width = wp('50%');
        dim.height = 180;
        break;
      case ViewTypes.MORE_RIGHT:
        dim.width = width * 0.7;
        dim.height = 180;
        break;
      case ViewTypes.MORE_LEFT:
        dim.width = width * 0.7;
        dim.height = 180;
        break;
      case ViewTypes.LESS_RIGHT:
        dim.width = wp('29.5%');
        dim.height = 180;
        break;
      case ViewTypes.LESS_LEFT:
        dim.width = wp('29.5%');
        dim.height = 180;
        break;
      case ViewTypes.LESS_EQUAL:
        dim.width = width * 0.33;
        dim.height = 180;
        break;
      case ViewTypes.FULL:
        dim.width = wp('100%');
        dim.height = 180;
        break;
      default:
        dim.width = 0;
        dim.height = 0;
    }
  },
);
