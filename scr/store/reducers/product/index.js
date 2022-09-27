import {
  CATEGORY_LISTING_REQUEST,
  CATEGORY_LISTING_FAILURE,
  CATEGORY_LISTING_SUCCESS,
  PRODUCT_LISTING_REQUEST,
  PRODUCT_LISTING_FAILURE,
  PRODUCT_LISTING_SUCCESS,
  PRODUCT_LISTING_BY_STORE_ID_REQUEST,
  PRODUCT_LISTING_BY_STORE_ID_FAILURE,
  PRODUCT_LISTING_BY_STORE_ID_SUCCESS,
  ADD_FAVOURITE_REQUEST,
  ADD_FAVOURITE_FAILURE,
  ADD_FAVOURITE_SUCCESS,
  GET_FAVOURITE_REQUEST,
  GET_FAVOURITE_SUCCESS,
  GET_FAVOURITE_FAILURE,
  REMOVE_FROM_FAVOURITE_REQUEST,
  REMOVE_FROM_FAVOURITE_SUCCESS,
  REMOVE_FROM_FAVOURITE_FAILURE,
  CLEAR_FAVOURITES_DATA,
} from '../../actions/types';
import authReducer from '../auth';
import {parseError, saveUserData} from '../../util';

const initialState = {
  errorMessage: 'Something went wrong. Please try again',
  isLoading: false,
  categoryList: [],
  productList: [],
  paginationData: null,
  favouritePagination: null,
  currentId: '',
  favouriteProductsList: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_FAVOURITES_DATA:
      return {
        ...state,
        favouriteProductsList: [],
        favouritePagination: null,
      };

    case CATEGORY_LISTING_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case CATEGORY_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryList: action.data.data,
      };
    case CATEGORY_LISTING_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };
    case PRODUCT_LISTING_REQUEST:
      return {
        ...state,
        productList:
          action.payload.currentId !== state.currentId ? [] : state.productList,
        isLoading: true,
        // currentId: action?.payload?.currentId,
        errorMessage: '',
      };
    case PRODUCT_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentId: action?.currentId,
        productList: [...state.productList, ...action.data.data.data],
        paginationData: action.data.data?.pagination,
      };
    case PRODUCT_LISTING_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case ADD_FAVOURITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        productList: state.productList.filter(function (item) {
          if (item.productId === action.payload.productId) {
            let temp = item;
            temp.productFavouriteId = true;
            return temp;
          } else {
            return item;
          }
        }),
        errorMessage: '',
      };
    case ADD_FAVOURITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        favouriteProductsList: [...state.favouriteProductsList, action.data],
        productList: state.productList.filter(function (item) {
          if (item.productId === action.data.productId) {
            let temp = item;
            temp.productFavouriteId = action.data.productFavouriteId;
            return temp;
          } else {
            return item;
          }
        }),
      };
    case ADD_FAVOURITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case REMOVE_FROM_FAVOURITE_REQUEST:
      console.log('state list is: ', state.productList);
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
        favouriteProductsList: state.favouriteProductsList.filter(
          i => i.productFavouriteId !== action.payload.favouriteId,
        ),
        productList: state.productList.filter(function (item) {
          if (item.productFavouriteId === action.payload.favouriteId) {
            let temp = item;
            temp.productFavouriteId = null;
            return temp;
          } else {
            return item;
          }
        }),
      };
    case REMOVE_FROM_FAVOURITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case REMOVE_FROM_FAVOURITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    case GET_FAVOURITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case GET_FAVOURITE_SUCCESS:
      console.log('GET_FAVOURITE_SUCCESS : => ', action.data.data.data);
      return {
        ...state,
        isLoading: false,
        favouriteProductsList: action.data.data,
        favouritePagination: action.data.pagination,
      };
    case GET_FAVOURITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: parseError(action.error),
      };

    default:
      return state;
  }
};

export default productReducer;
