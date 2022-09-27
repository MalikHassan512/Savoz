import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  GET_FAVOURITE_SUCCESS,
  GET_FAVOURITE_REQUEST,
  GET_FAVOURITE_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData() {
  try {
    const {favouritePagination, favouriteProductsList} = yield select(state => state.reducer.product);
    const {authTokens} = yield select(state => state.reducer.auth);

    const URL = url.getFavourite;
    let page = 1;
    if (favouritePagination !== null && favouriteProductsList.length > 30) {
      page = favouritePagination?.nextPage;
    }

    const sendData = {
      method: 'GET',
      url: `${URL}?page=${page}&limit=30`,
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
    };
    console.log('GET_FAVOURITE API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: GET_FAVOURITE_SUCCESS,
      data: data.data.data,
    });
    console.log('GET_FAVOURITE API success ', data.data);
  } catch (error) {
    console.log('GET_FAVOURITE API fails: ', error?.response);
    yield put({
      type: GET_FAVOURITE_FAILURE,
      error,
    });
  }
}

function* dataSaga() {
  yield takeEvery(GET_FAVOURITE_REQUEST, fetchData);
}

export default dataSaga;
