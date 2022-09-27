import {put, takeEvery, call} from 'redux-saga/effects';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  UPDATE_PROFILE_DATA,
  GET_USER_CARD_DATA_REQUEST,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {payload, onResponse} = action;
    // let formData = new FormData();
    // for (let key in payload) {
    //   formData.append(key, payload[key]);
    // }
    const URL = url.login;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
      // data: formData,
    };
    console.log('login API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: LOGIN_SUCCESS,
      data: data.data,
    });
    yield put({
      type: UPDATE_PROFILE_DATA,
      payload: {userData: data.data.data.user},
    });
    console.log('login API success: ', data.data.data.user);
    yield put({type: GET_USER_CARD_DATA_REQUEST});

    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('login API fails: ', error);
    yield put({
      type: LOGIN_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(LOGIN_REQUEST, fetchData);
}

export default dataSaga;
