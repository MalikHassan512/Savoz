import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  SAVE_PAYMENT_METHOD_FAILURE,
  SAVE_PAYMENT_METHOD_SUCCESS,
  SAVE_PAYMENT_METHOD_REQUEST,
  GET_USER_CARD_DATA_REQUEST,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    const {payload, onResponse} = action;
    console.log('payload: ', payload);
    console.log('authTokens: ', authTokens);
    const URL = url.savePaymentMethod;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
      headers: {
        Authorization: `Bearer ${authTokens?.accessToken}`,
      },
    };
    console.log(
      'SAVE_PAYMENT_METHOD API send data: ',
      JSON.stringify(sendData),
    );
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: SAVE_PAYMENT_METHOD_SUCCESS,
      data: data.data,
    });
    console.log('SAVE_PAYMENT_METHOD API success: ', data?.data);

    yield put({
      type: GET_USER_CARD_DATA_REQUEST,
    });
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('SAVE_PAYMENT_METHOD API fails: ', error?.response);
    yield put({
      type: SAVE_PAYMENT_METHOD_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(SAVE_PAYMENT_METHOD_REQUEST, fetchData);
}

export default dataSaga;
