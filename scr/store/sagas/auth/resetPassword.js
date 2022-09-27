import {put, takeEvery, call} from 'redux-saga/effects';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {payload, onResponse} = action;
    const URL = url.resetPassword;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
    };
    console.log('RESET_PASSWORD API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: RESET_PASSWORD_SUCCESS,
      data: data.data,
    });
    console.log('RESET_PASSWORD API success');
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('RESET_PASSWORD API fails: ', error);
    yield put({
      type: RESET_PASSWORD_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(RESET_PASSWORD_REQUEST, fetchData);
}

export default dataSaga;
