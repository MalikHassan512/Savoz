import {
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  UPDATE_PROFILE_DATA,
  PROFILE_DELETE_FAILURE,
  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_SUCCESS,
  SAVE_PAYMENT_METHOD_FAILURE,
  SAVE_PAYMENT_METHOD_REQUEST,
  SAVE_PAYMENT_METHOD_SUCCESS,
  GET_USER_CARD_DATA_REQUEST,
  GET_USER_CARD_DATA_FAILURE,
  GET_USER_CARD_DATA_SUCCESS,
  GET_USER_ADDRESSES_REQUEST,
  GET_USER_ADDRESSES_FAILURE,
  GET_USER_ADDRESSES_SUCCESS,
  UPLOAD_PROFILE_PIC_FAILURE,
  UPLOAD_PROFILE_PIC_REQUEST,
  UPLOAD_PROFILE_PIC_SUCCESS,
} from '../../actions/types';
import {saveUserData, clearUserData, parseError} from '../../util';

const initialState = {
  errorMessage: 'Something went wrong. Please try again',
  isLoading: false,
  userData: null,
  userCards: [],
  orderAddresses: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ADDRESSES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_ADDRESSES_SUCCESS:
      console.log('GET_USER_ADDRESSES_SUCCESS : => ', action.data.data)
      return {
        ...state,
        isLoading: false,
        orderAddresses: action.data.data,
      };
    case GET_USER_ADDRESSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case GET_USER_CARD_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_CARD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userCards: action.data.data,
      };

    case UPLOAD_PROFILE_PIC_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case UPLOAD_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: action.data.data,
      };
    case UPLOAD_PROFILE_PIC_FAILURE:
    case GET_USER_CARD_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case UPDATE_PROFILE_DATA:
      console.log('UPDATE_PROFILE_DATA : ', action);
      return {
        ...state,
        userData: action.payload.userData,
      };
    case PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case PROFILE_UPDATE_SUCCESS:
      saveUserData({user: action.data.data});
      return {
        ...state,
        isLoading: false,
        userData: action.data.data,
      };
    case PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case PROFILE_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case PROFILE_DELETE_SUCCESS:
      clearUserData();
      return {
        ...state,
        isLoading: false,
        userData: null,
      };
    case PROFILE_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case SAVE_PAYMENT_METHOD_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case SAVE_PAYMENT_METHOD_SUCCESS:
      clearUserData();
      return {
        ...state,
        isLoading: false,
      };
    case SAVE_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    default:
      return state;
  }
};

export default profileReducer;
