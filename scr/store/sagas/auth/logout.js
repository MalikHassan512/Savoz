import {put, takeEvery, call} from 'redux-saga/effects';
import {
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  CLEAR_CART, CLEAR_FAVOURITES_DATA,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {payload, onResponse} = action;
    console.log('logout API payload: ', payload);
    const URL = url.logout;
    const sendData = {
      method: 'DELETE',
      url: URL,
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    };
    console.log('logout API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: LOGOUT_SUCCESS,
      data: data.data,
    });
    yield put({
      type: CLEAR_CART,
    });
    yield put({
      type: CLEAR_FAVOURITES_DATA,
    });
    console.log('logOut API success');
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('logout API fails: ', error?.response?.data);
    yield put({
      type: LOGOUT_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(LOGOUT_REQUEST, fetchData);
}

export default dataSaga;
