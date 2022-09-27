import {
  GUEST_LOGIN_REQUEST,
  GUEST_LOGIN_SUCCESS,
  GUEST_LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  VALIDATE_RESET_TOKEN_REQUEST,
  VALIDATE_RESET_TOKEN_FAILURE,
  VALIDATE_RESET_TOKEN_SUCCESS,
  NEW_PASSWORD_FAILURE,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  UPDATE_USER_DATA,
  CLEAR_USER_DATA,
} from '../../actions/types';
import {saveUserData, clearUserData, parseError} from '../../util';

const initialState = {
  userData: null,
  errorMessage: 'Something went wrong. Please try again',
  isLoading: false,
  authTokens: null,
  validateTokenLoading: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_USER_DATA:
      return {
        ...state,
        userData: null,
        authTokens: null,
      };

    case UPDATE_USER_DATA:
      saveUserData(action.payload);
      return {
        ...state,
        userData: action.payload.user,
        authTokens: action.payload.tokens,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case LOGIN_SUCCESS:
      console.log('login user data: ', action.data.data);
      saveUserData(action.data.data);
      return {
        ...state,
        userData: action.data.data.user,
        authTokens: action.data.data.tokens,
        isLoading: false,
        errorMessage: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case GUEST_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case GUEST_LOGIN_SUCCESS:
      console.log('login user data: ', action.data.data);
      saveUserData(action.data.data);
      return {
        ...state,
        userData: action.data.data.user,
        authTokens: action.data.data.tokens,
        isLoading: false,
        errorMessage: '',
      };
    case GUEST_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case SIGN_UP_SUCCESS:
      saveUserData(action.data.data);
      return {
        ...state,
        userData: action.data.data.user,
        authTokens: action.data.data.tokens,
        isLoading: false,
        errorMessage: '',
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };

    case LOGOUT_SUCCESS:
      console.log('login user data: ', action.data.data);
      clearUserData();
      return {
        ...state,
        userData: null,
        authTokens: null,
        isLoading: false,
        errorMessage: '',
      };

    case LOGOUT_FAILURE:
      clearUserData();
      return {
        ...state,
        userData: null,
        authTokens: null,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case VALIDATE_RESET_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
        validateTokenLoading: true,
      };

    case VALIDATE_RESET_TOKEN_SUCCESS:
      return {
        ...state,
        validateTokenLoading: false,
        errorMessage: '',
      };

    case VALIDATE_RESET_TOKEN_FAILURE:
      return {
        ...state,
        isLoading: false,
        validateTokenLoading: false,
        errorMessage: parseError(action.error),
      };

    case NEW_PASSWORD_REQUEST:
      return {
        ...state,
        errorMessage: '',
      };

    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
      };

    case NEW_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    default:
      return state;
  }
};

export default authReducer;
