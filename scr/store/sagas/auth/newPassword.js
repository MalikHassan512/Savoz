import {put, takeEvery, call} from 'redux-saga/effects';
import {
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {payload, onResponse} = action;
    const URL = url.newPassword;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
    };
    console.log('NEW_PASSWORD API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: NEW_PASSWORD_SUCCESS,
      data: data.data,
    });
    console.log('NEW_PASSWORD API success');
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('NEW_PASSWORD API fails: ', error);
    yield put({
      type: NEW_PASSWORD_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(NEW_PASSWORD_REQUEST, fetchData);
}

export default dataSaga;
