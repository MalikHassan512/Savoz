import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_REQUEST, GET_ALL_ORDERS_REQUEST, GET_USER_ADDRESSES_REQUEST,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    const {payload, onResponse} = action;
    const URL = url.placeOrder;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
    };
    console.log('PLACE_ORDER API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    console.log('PLACE_ORDER API success: ', JSON.stringify(data.data));
    yield put({
      type: PLACE_ORDER_SUCCESS,
      data: data.data,
    });
    yield put({
      type: GET_ALL_ORDERS_REQUEST,
    });
    yield put({
      type: GET_USER_ADDRESSES_REQUEST,
    });
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('PLACE_ORDER API fails: ', error);
    yield put({
      type: PLACE_ORDER_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(PLACE_ORDER_REQUEST, fetchData);
}

export default dataSaga;
