import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  GET_APP_SETTINGS_REQUEST,
  GET_APP_SETTINGS_SUCCESS,
  GET_APP_SETTINGS_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    console.log('access token is: ', authTokens);
    const URL = `${url.getAppSettings}`;
    const sendData = {
      method: 'GET',
      url: URL,
      headers: {
        Authorization: `Bearer ${authTokens?.accessToken}`,
      },
    };
    console.log('GET_APP_SETTINGS API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: GET_APP_SETTINGS_SUCCESS,
      data: data.data,
    });
    console.log('GET_APP_SETTINGS API success');
  } catch (error) {
    console.log('GET_APP_SETTINGS API fails: ', error?.response);
    yield put({
      type: GET_APP_SETTINGS_FAILURE,
      error,
    });
  }
}

function* dataSaga() {
  yield takeEvery(GET_APP_SETTINGS_REQUEST, fetchData);
}

export default dataSaga;
