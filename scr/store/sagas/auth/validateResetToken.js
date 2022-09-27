import {put, takeEvery, call} from 'redux-saga/effects';
import {
  VALIDATE_RESET_TOKEN_REQUEST,
  VALIDATE_RESET_TOKEN_SUCCESS,
  VALIDATE_RESET_TOKEN_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {payload, onResponse} = action;
    const URL = url.validateResetToken;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
    };
    console.log('VALIDATE_RESET API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: VALIDATE_RESET_TOKEN_SUCCESS,
      data: data.data,
    });
    console.log('VALIDATE_RESET_TOKEN API success');
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('VALIDATE_RESET_TOKEN API fails: ', JSON.stringify(error?.response));
    yield put({
      type: VALIDATE_RESET_TOKEN_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(VALIDATE_RESET_TOKEN_REQUEST, fetchData);
}

export default dataSaga;
