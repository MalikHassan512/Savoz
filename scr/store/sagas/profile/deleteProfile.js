import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  UPDATE_USER_DATA,
  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_FAILURE,
  PROFILE_DELETE_SUCCESS,
  CLEAR_USER_DATA,
  CLEAR_CART,
  CLEAR_FAVOURITES_DATA,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    const {payload, onResponse} = action;
    const URL = url.profileDelete;
    const sendData = {
      method: 'DELETE',
      url: URL,
      data: payload,
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
    };
    console.log('PROFILE_DELETE API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    //=================================================//
    yield put({
      type: PROFILE_DELETE_SUCCESS,
      data: data.data,
    });

    yield put({type: CLEAR_USER_DATA});

    console.log('PROFILE_DELETE API success');

    yield put({
      type: CLEAR_CART,
    });
    yield put({
      type: CLEAR_FAVOURITES_DATA,
    });

    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('PROFILE_DELETE API fails: ', error?.response);
    yield put({
      type: PROFILE_DELETE_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(PROFILE_DELETE_REQUEST, fetchData);
}

export default dataSaga;
