import {put, takeEvery, call} from 'redux-saga/effects';
import {
  CATEGORY_LISTING_SUCCESS,
  CATEGORY_LISTING_REQUEST,
  CATEGORY_LISTING_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {payload, onResponse} = action;
    const URL = url.categoryListing;
    const sendData = {
      method: 'POST',
      url: URL,
      data: payload,
    };
    console.log('CATEGORY_LISTING API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: CATEGORY_LISTING_SUCCESS,
      data: data.data,
    });
    console.log('CATEGORY_LISTING API success');
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('CATEGORY_LISTING API fails: ', error?.response);
    yield put({
      type: CATEGORY_LISTING_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(CATEGORY_LISTING_REQUEST, fetchData);
}

export default dataSaga;
