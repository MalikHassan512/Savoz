import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_TO_CART,
  UPDATE_PRODUCT_QTY,
  UPDATE_DATA_FROM_LOCAL_STORAGE,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  UPDATE_ORDER_TYPE,
  CLEAR_CART,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_SUCCESS,
  GET_APP_SETTINGS_REQUEST,
  GET_APP_SETTINGS_SUCCESS,
  GET_APP_SETTINGS_FAILURE,
} from '../../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constants} from '../../../constants';
import {parseError} from '../../util';

const initialState = {
  errorMessage: 'Something went wrong. Please try again',
  isLoading: false,
  currentCart: [],
  totalPrice: 0,
  productCount: 0,
  myOrders: [],
  orderType: 24,
  paginationData: null,
  settings: null,
};

const updateTotalPrice = cart => {
  let price = 0;
  cart.forEach(i => {
    price = price + i.productUnitPrice * i.purchaseQty;
  });
  return price;
};

const updateStoreLocally = cart => {
  AsyncStorage.setItem(Constants.CART_DATA, JSON.stringify(cart))
    .then(() => {
      console.log('Cart Data stored in Async successfully');
    })
    .catch(e => console.log('Error in Cart Data storing in Async: ', e));
};

const checkCart = (state, product) => {
  let index = null;
  let arr = state.currentCart;
  state.currentCart.forEach((i, ind) => {
    if (i?.productId === product?.productId) {
      index = ind;
    }
  });
  if (index !== null) {
    arr[index].purchaseQty = arr[index].purchaseQty + product.purchaseQty;
  } else {
    arr = [...arr, product];
  }
  updateStoreLocally(arr);
  state.totalPrice = updateTotalPrice(arr);
  state.productCount = arr.length;
  return arr;
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myOrders: action.data.data?.orders,
        paginationData: action.data.data?.pagination,
      };
    case GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case CLEAR_CART:
      return {
        ...state,
        currentCart: [],
        totalPrice: 0,
        productCount: 0,
      };
    case UPDATE_ORDER_TYPE:
      return {
        ...state,
        orderType: action.payload.type,
      };
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        currentCart: checkCart(state, action.payload),
      };
    case REMOVE_PRODUCT_TO_CART:
      state.currentCart.splice(action.payload.index, 1);
      updateStoreLocally(state.currentCart);
      return {
        ...state,
        currentCart: state.currentCart,
        productCount: state.productCount - 1,
        totalPrice: updateTotalPrice(state.currentCart),
      };
    case UPDATE_PRODUCT_QTY:
      // console.log(
      //   'index: ',
      //   action.payload.index,
      //   ' payload: ',
      //   action.payload,
      // );
      state.currentCart[action.payload.index].purchaseQty = action.payload.qty;
      updateStoreLocally(state.currentCart);
      return {
        ...state,
        currentCart: state.currentCart,
        totalPrice: updateTotalPrice(state.currentCart),
      };
    case UPDATE_DATA_FROM_LOCAL_STORAGE:
      return {
        ...state,
        currentCart: action.payload.cart,
        productCount: action.payload.cart.length,
        totalPrice: updateTotalPrice(action.payload.cart),
      };

    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PLACE_ORDER_SUCCESS:
      AsyncStorage.setItem(Constants.CART_DATA, '').catch(e => console.log(e));
      return {
        ...state,
        isLoading: false,
        currentCart: [],
        totalPrice: 0,
        productCount: 0,
        myOrders: [...state.myOrders, action.data.data],
      };
    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case GET_APP_SETTINGS_REQUEST:
      return {
        ...state,
      };
    case GET_APP_SETTINGS_SUCCESS:
      console.log('GET_APP_SETTINGS_SUCCESS: => ', action.data.data)
      return {
        ...state,
        settings: action.data.data,
      };
    case GET_APP_SETTINGS_FAILURE:
      return {
        ...state,
        errorMessage: parseError(action.error),
      }

    default:
      return state;
  }
};

export default cartReducer;
