import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  PROFILE_UPDATE_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  UPDATE_USER_DATA,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    const {payload, onResponse} = action;
    const URL = url.profileUpdate;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
    };
    console.log('PROFILE_UPDATE API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);

    yield put({
      type: PROFILE_UPDATE_SUCCESS,
      data: data.data,
    });
    console.log('PROFILE_UPDATE API success: ', data?.data);
    yield put({
      type: UPDATE_USER_DATA,
      payload: {user: data?.data?.data, tokens: authTokens},
    });

    console.log('PROFILE_UPDATE API success');
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('PROFILE_UPDATE API fails: ', error?.response);
    yield put({
      type: PROFILE_UPDATE_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(PROFILE_UPDATE_REQUEST, fetchData);
}

export default dataSaga;
