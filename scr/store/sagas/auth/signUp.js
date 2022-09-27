import {put, takeEvery, call} from 'redux-saga/effects';
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST, UPDATE_PROFILE_DATA,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {payload, onResponse} = action;
    const URL = url.signUp;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
    };
    console.log('signup API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: data.data,
    });
    yield put({
      type: UPDATE_PROFILE_DATA,
      payload: {userData: data.data.data.user},
    });
    console.log('signup API success');
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('signup API fails: ', error?.response?.data);
    yield put({
      type: SIGN_UP_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(SIGN_UP_REQUEST, fetchData);
}

export default dataSaga;
