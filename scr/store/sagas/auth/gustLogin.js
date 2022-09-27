import {put, takeEvery, call} from 'redux-saga/effects';
import {
  GUEST_LOGIN_REQUEST,
  GUEST_LOGIN_FAILURE,
  GUEST_LOGIN_SUCCESS,
  UPDATE_PROFILE_DATA,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {onResponse} = action;
    // const URL = url.login;
    const URL = url.guestLogin;
    const sendData = {
      method: 'POST',
      url: URL,
      // data: {},
    };
    console.log('guestLogin API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: GUEST_LOGIN_SUCCESS,
      data: data.data,
    });

    console.log('data.data.data: ', data?.data?.data?.user);
    yield put({
      type: UPDATE_PROFILE_DATA,
      payload: {userData: data.data.data.user},
    });

    console.log('guestLogin API success: ', data.data.data.user);
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('guestLogin API fails: ', error);
    yield put({
      type: GUEST_LOGIN_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(GUEST_LOGIN_REQUEST, fetchData);
}

export default dataSaga;
