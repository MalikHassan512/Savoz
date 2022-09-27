import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    console.log('access token is: ', authTokens);
    const {payload, onResponse} = action;
    const URL = `${url.getAllOrders}?limit=100`;
    const sendData = {
      method: 'GET',
      url: URL,
      headers: {
        Authorization: `Bearer ${authTokens?.accessToken}`,
      },
    };
    console.log('GET_ALL_ORDERS API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: GET_ALL_ORDERS_SUCCESS,
      data: data.data,
    });
    console.log('GET_ALL_ORDERS API success');
    if (onResponse) {
      yield call(onResponse, data.data);
    }
  } catch (error) {
    const {onResponse} = action;
    console.log('GET_ALL_ORDERS API fails: ', error?.response);
    yield put({
      type: GET_ALL_ORDERS_FAILURE,
      error,
    });
    if (onResponse) {
      yield call(onResponse, 'error');
    }
  }
}

function* dataSaga() {
  yield takeEvery(GET_ALL_ORDERS_REQUEST, fetchData);
}

export default dataSaga;
