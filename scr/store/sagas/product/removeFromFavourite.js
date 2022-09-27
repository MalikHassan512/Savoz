import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  REMOVE_FROM_FAVOURITE_SUCCESS,
  REMOVE_FROM_FAVOURITE_REQUEST,
  REMOVE_FROM_FAVOURITE_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    const {payload, onResponse} = action;
    const URL = url.removeFromFavourite;

    const sendData = {
      method: 'DELETE',
      url: URL,
      data: payload,
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
    };
    console.log(
      'REMOVE_FROM_FAVOURITE API send data: ',
      JSON.stringify(sendData),
    );
    const data = yield call(axiosInstance, sendData);

    console.log('REMOVE_FROM_FAVOURITE API success ', data.data);

    yield put({
      type: REMOVE_FROM_FAVOURITE_SUCCESS,
      data: data.data,
    });
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('REMOVE_FROM_FAVOURITE API fails: ', error?.response?.data);
    yield put({
      type: REMOVE_FROM_FAVOURITE_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(REMOVE_FROM_FAVOURITE_REQUEST, fetchData);
}

export default dataSaga;
