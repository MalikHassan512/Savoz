import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  PRODUCT_LISTING_SUCCESS,
  PRODUCT_LISTING_REQUEST,
  PRODUCT_LISTING_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';
import {useSelector} from 'react-redux';

function* fetchData(action) {
  try {
    const {paginationData, currentId} = yield select(
      state => state.reducer.product,
    );
    const {payload, onResponse} = action;
    const URL = url.productListing;
    let page = 1;

    let params = {};
    // payload.forEach(key => {
    //
    // })
    Object.keys(payload).forEach(key => {
      if (key !== 'currentId') {
        params = {...params, [key]: payload[key]};
        // alert('this is current id');
      }
    });

    // let noMoreData = false;

    console.log('current id: ', currentId);
    console.log('payload id: ', payload.currentId);
    if (paginationData !== null && currentId === payload.currentId) {
      page = paginationData?.nextPage;
    }

    const sendData = {
      method: 'POST',
      url: `${URL}?page=${page}`,
      data: params,
      // data: payload,
    };
    console.log('PRODUCT_LISTING API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);
    yield put({
      type: PRODUCT_LISTING_SUCCESS,
      data: data.data,
      currentId: payload.currentId,
    });
    console.log('PRODUCT_LISTING API success ', data.data);
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('PRODUCT_LISTING API fails: ', error?.response?.data);
    yield put({
      type: PRODUCT_LISTING_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(PRODUCT_LISTING_REQUEST, fetchData);
}

export default dataSaga;
