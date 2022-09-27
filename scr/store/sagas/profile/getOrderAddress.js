import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  GET_USER_ADDRESSES_SUCCESS,
  GET_USER_ADDRESSES_REQUEST,
  GET_USER_ADDRESSES_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    console.log('access token is: ', authTokens);
    const {onResponse} = action;
    const URL = url.getAddresses;
    const sendData = {
      method: 'GET',
      url: URL,
      headers: {
        Authorization: `Bearer ${authTokens?.accessToken}`,
      },
    };
    console.log('GET_USER_ADDRESSES API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: GET_USER_ADDRESSES_SUCCESS,
      data: data.data,
    });
    console.log('GET_USER_ADDRESSES API success');
    if (onResponse) {
      yield call(onResponse, data.data);
    }
  } catch (error) {
    const {onResponse} = action;
    console.log('GET_USER_ADDRESSES API fails: ', error?.response);
    yield put({
      type: GET_USER_ADDRESSES_FAILURE,
      error,
    });
    if (onResponse) {
      yield call(onResponse, 'error');
    }
  }
}

function* dataSaga() {
  yield takeEvery(GET_USER_ADDRESSES_REQUEST, fetchData);
}

export default dataSaga;
